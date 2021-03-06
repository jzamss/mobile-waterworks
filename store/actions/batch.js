import * as db from "../../rsi/db";
import * as fetch from "../../rsi/fetch";

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

export const downloadBatch = async (
  batchno,
  user,
  initRecordCount,
  incrementCounter,
  connection
) => {
  const batch = await fetchBatch(batchno, user, connection);
  batch.readcount = 0;
  batch._stubouts = batch.stubouts;
  delete batch.stubouts;
  initRecordCount(batch.recordcount);
  await saveBatch(batch);
  await downloadAccounts(batch, incrementCounter, connection);
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
  return async (dispatch) => {
    dispatch({ type: SET_STUBOUT, stubout });
  };
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

const fetchBatch = (batchno, user, connection) => {
  const supportService =  fetch.getSupportService(connection);
  const userid = user.objid;
  const url = `${supportService}.getBatch?batchid=${batchno}&readerid=${userid}`;
  return fetch.get(url);
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

const fetchAccounts = (batch, start, connection) => {
  const limit = 10;
  const supportService = fetch.getSupportService(connection);
  const url = `${supportService}.getBatchItems?batchid=${batch.objid}&start=${start}&limit=${limit}`;
  return fetch.get(url);
};

const downloadAccounts = async (batch, incrementCounter, connection) => {
  let start = batch.readcount;
  while (start < batch.recordcount) {
    const accounts = await fetchAccounts(batch, start, connection);
    for (let i = 0; i < accounts.length; i++) {
      await saveAccount(accounts[i]);
      incrementCounter();
    }
    start += accounts.length;
  }
};

const saveAccount = (account) => {
  //initialize missing values
  account.state = account.state || 0;
  account.reading = account.reading || 0;
  account.amount = account.amount || 0;
  account.otherfees = account.otherfees || 0;
  account.volume = account.volume || 0;
  account.total = account.total || 0;
  account.units = account.units || 1;
  account.hold = !!account.hold;
  return db.create({ schema: accountSchema }, account);
};
