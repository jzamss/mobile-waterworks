import * as db from "../../rsi-react-native/lib/db";
import * as util from "../../rsi-react-native/lib/db-util";
import getService from "../../rsi-react-native/lib/server-remote-proxy";

const Service = getService();

const accountSchema = "account";
const batchSchema = "batch";
const stuboutSchema = "stubout";

export const SET_BATCHES = "SET_BATCHES";
export const SET_BATCH = "SET_BATCH";
export const UPDATE_BATCH = "UPDATE_BATCH";
export const SET_STUBOUT = "SET_STUBOUT";
export const UPDATE_STUBOUT = "UPDATE_STUBOUT";

/* load batches from local db */
export const loadBatches = (user) => {
  return async (dispatch) => {
    const params = {
      schema: batchSchema,
      where: { readerid: user.objid},
      orderBy: "objid",
    };
    const batches = await db.getList(params);
    return dispatch({ type: SET_BATCHES, batches });
  };
};

/* upload batch */
export const uploadBatch = (batchId) => {
  return async (dispatch) => {
    const svc = await Service.lookup("WaterworksMobileSupportService");

    const batch = await db.find({ schema: batchSchema, objid: batchId });
    batch.stubouts = await db.getList({
      schema: stuboutSchema,
      subareaid: batch.subareaid,
    });
    await svc.startUploadBatch({ data: batch });

    let readcount = batch.readcount;

    const accountsForUpload = await db.getList({
      schema: accountSchema,
      where: ["batchid = :batchId AND state > 0", { batchId }],
    });

    for (let i = 0; i < accountsForUpload.length; i++) {
      const account = accountsForUpload[i];
      account.readingdate = util.formatDate(account.readingdate);
      const res = await svc.uploadReadings({ data: [account] });
      if (res && res.status === "ERR") {
        throw res.message;
      } else {
        await db.remove({
          schema: accountSchema,
          where: { objid: account.objid },
        });
        --readcount;
        await db.update(
          { schema: batchSchema, where: { objid: batchId } },
          { readcount }
        );
      }
    }

    const existAccount = await db.find({
      schema: accountSchema,
      where: { batchid: batchId },
    });
    if (!existAccount) {
      await db.remove({ schema: batchSchema, objid: batchId });
    }
    const batches = await db.getList({ schema: batchSchema, orderBy: "objid" });
    return dispatch({ type: SET_BATCHES, batches });
  };
};

export const downloadBatches = async ({ user, updateStatus }) => {
  const svc = await Service.lookup("WaterworksMobileSupportService");
  const batches = await svc.getBatches({ readerid: user.objid });
  if (batches.length === 0) {
    throw "There are no available batches assigned.";
  }

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    await downloadBatch({ user, updateStatus, batch });
  }
};

export const downloadBatch = async ({ user, updateStatus, batch : downloadedBatch }) => {
  const batch = await fetchBatch(downloadedBatch, user);
  const status = {
    batchid: batch.objid, 
    recordcount: batch.recordcount,
    downloadedcount: 0,
  }
  updateStatus({...status});

  batch._stubouts = batch.stubouts;
  batch.readcount = 0;
  delete batch.stubouts;
  await saveBatch(batch);
  await downloadAccounts({batch, updateStatus, status});
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

const fetchBatch = async (batch, user) => {
  const svc = await Service.lookup("WaterworksMobileSupportService");
  return await svc.getBatch({ batchid: batch.batchid, readerid: user.objid });
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

const fetchAccounts = async (batch, start) => {
  const limit = 10;
  const svc = await Service.lookup("WaterworksMobileSupportService");
  return await svc.getBatchItems({ batchid: batch.objid, start, limit });
};

const downloadAccounts = async ({batch, updateStatus, status}) => {
  let start = batch.readcount;
  while (start < batch.recordcount) {
    const accounts = await fetchAccounts(batch, start);
    for (let i = 0; i < accounts.length; i++) {
      await saveAccount(accounts[i]);
      status.downloadedcount += 1;
      updateStatus({...status});
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
