import { DUMMY_BATCHES, DUMMY_ACCOUNTS } from "../../api/dummy-data/batch";

import * as db from "../../rsi/db";

const accountSchema = "account";
const batchSchema = "batch";
const stuboutSchema = "stubout";

export const SET_BATCHES = "SET_BATCHES";
export const SET_BATCH = "SET_BATCH";
export const UPDATE_BATCH = "UPDATE_BATCH";
export const SET_STUBOUT = "SET_STUBOUT";
export const UPDATE_STUBOUT = "UPDATE_STUBOUT";

/* load batches from local db */
export const loadBatches = () => {
  return async (dispatch) => {
    const params = { schema: batchSchema, orderBy: "objid" };
    const batches = await db.getList(params);
    return dispatch({ type: SET_BATCHES, batches });
  };
};

export const downloadBatch = (
  batchno,
  user,
  initRecordCount,
  incrementCounter
) => {
  return async (dispatch) => {
    try {
      const batch = await fetchBatch(batchno, user);
      initRecordCount(batch.recordcount);
      await saveBatch(batch);
      await downloadAccounts(batch, incrementCounter);
      dispatch(loadBatches());
    } catch (err) {
      throw err;
    }
  };
};

export const setSelectedBatch = (batch) => {
  return async (dispatch) => {
    const stubouts = await db.getList({
      schema: stuboutSchema,
      where: { subareaid: batch.subareaid },
    });
    dispatch({ type: SET_BATCH, batch, stubouts });
  };
};

export const updateReadCount = (batch) => {
  return async (dispatch) => {
    const params = {
      schema: accountSchema,
      select: "count(*) as cnt",
      where: ["batchid = :batchid AND reading > 0", { batchid: batch.objid }],
    };
    const res = await db.find(params);
    const updatedBatch = { ...batch };
    updatedBatch.readcount = res.cnt;
    await db.update({ schema: batchSchema }, updatedBatch);
    dispatch(updateBatch(updatedBatch));
  };
};

export const setSelectedStubout = (stubout) => {
  return async dispatch => {
    dispatch({ type: SET_STUBOUT, stubout });
  }
};

export const saveStuboutLocation = (stubout, location) => {
  return async (dispatch) => {
    const updatedStubout = { ...stubout };
    updatedStubout.lat = location.lat;
    updatedStubout.lng = location.lng;
    await db.update({ schema: stuboutSchema }, updatedStubout);
    dispatch(updateStubout(updatedStubout));
  };
};

export const updateStubout = (stubout) => {
  return { type: UPDATE_STUBOUT, stubout };
};


const updateBatch = (batch) => {
  return { type: UPDATE_BATCH, batch };
};

const fetchBatch = (batchno, user) => {
  const testNotReader = false;
  const testNotAvailable = false;

  return new Promise((resolve, reject) => {
    const batch = DUMMY_BATCHES.find((item) => item.objid === batchno);
    if (batch) {
      if (testNotReader) {
        reject("The reader is not the user.");
      }
      if (testNotAvailable) {
        reject("Batch is not yet available for download");
      }
      resolve(batch);
    } else {
      reject("Batch does not exist.");
    }
  });
};

const saveBatch = async (batch) => {
  await db.remove({ schema: batchSchema, where: { objid: batch.objid } });
  await db.create({ schema: batchSchema }, batch);

  const saveStuboutPromises = [];
  batch._stubouts.forEach((stubout) => {
    saveStuboutPromises.push(db.create({ schema: stuboutSchema }, stubout));
  });

  Promise.all(saveStuboutPromises).catch((err) => {
    console.log("Save Stubout [ERROR]", err);
    throw "Failed to save all stubouts.";
  });
};

const downloadAccounts = async (batch, incrementCounter) => {
  //TODO: download data from server by 25 rows
  const accounts = DUMMY_ACCOUNTS.filter(
    (acct) => acct.batchid === batch.objid
  );
  for (let i = 0; i < accounts.length; i++) {
    await saveAccount(accounts[i]);
    incrementCounter();
  }
};

//SIMULATE FETCHING AND SAVING
const saveAccount = async (account) => {
  db.create({ schema: accountSchema }, account);
  const timer = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
  await timer;
};
