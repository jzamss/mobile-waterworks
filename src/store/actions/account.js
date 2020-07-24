import * as db from "../../rsi-react-native/lib/db";
import * as batchActions from "../../store/actions/batch";

import { getRates } from "../../api/rate";

const schema = "account";

export const SET_ACCOUNT = "SET_ACCOUNT";
export const SET_ACCOUNTS = "SET_ACCOUNTS";
export const SET_PAGE = "SET_PAGE";

export const setPage = (page) => {
  return {type: SET_PAGE, page};
}

export const loadAccounts = ({batchId, filter, page = 0}) => {
  return async dispatch => {
    const where = buildWhere(batchId, filter);
    const rowsPerPage = filter.rowsPerPage || 5;
    const start = page * rowsPerPage;
    const params = { schema, where, start, limit: rowsPerPage, orderBy: "seqno" };
    const accounts = await db.getList(params);
    dispatch({type: SET_ACCOUNTS, accounts});
  }
};

export const loadNextAccount = (account) => {
  return async (dispatch) => {
    const nextAccount = await db.find({
      schema: "account",
      where: ["seqno > :seqno", account],
      orderBy: "seqno",
    });
    dispatch({ type: SET_ACCOUNT, account: nextAccount });
  };
};

export const setSelectedAccount = (account) => {
  return async (dispatch) => {
    dispatch({ type: SET_ACCOUNT, account });
  };
};


export const saveLocation = (account, location) => {
  return async (dispatch) => {
    const updatedAccount = { ...account };
    updatedAccount.lat = location.lat;
    updatedAccount.lng = location.lng;
    await db.update({ schema }, updatedAccount);
    dispatch(setSelectedAccount(updatedAccount));
  };
};

const getRules = async (ruleType) => {
  const rules = await getRates({ ruleType });
  const ruleFuncs = [];
  rules.forEach((rule) => {
    const ruleFunc = eval(`(${rule.script})`);
    ruleFuncs.push(ruleFunc);
  });
  return ruleFuncs;
};

const getWaterBill = (batch) => {
  return {
    year: batch.year,
    month: batch.month,
    barangayid: batch.barangayid,
    areacode: batch.areacode,
    todate: batch.todate,
    subareacode: batch.subareacode,
    barangay: batch.barangay,
    discdate: batch.discdate,
    month: batch.month,
    fromdate: batch.fromdate,
    duedate: batch.duedate,
    year: batch.year,
  };
};

const getWaterConsumption = (account) => {
  return {
    seqno: account.seqno,
    acctno: account.acctno,
    classification: account.classification,
    prevreading: account.prevreading,
    reading: account.reading,
    meterserialno: account.meterserialno,
    meterbrand: account.meterbrand,
    metersize: account.metersize,
    metercapacity: account.metercapacity,
    volume: account.volume,
    amount: account.amount,
    readingdate: account.readingdate,
    stuboutid: account.stuboutid,
    units: account.units,
    hold: account.hold,
  };
};

const getWaterAccount = (account) => {
  return {
    acctno: account.acctno,
    classification: account.classification,
    meterserialno: account.meterserialno,
    meterbrand: account.meterbrand,
    metersize: account.metersize,
    metercapacity: account.metercapacity,
    volume: account.volume,
    units: account.units,
  };
};

const getWaterAttribute = (account) => {
  const attributes = account.attributes || [];
  const wa = { name: "" };
  if (attributes) {
    wa.name = attributes.join("|");
  }
  return wa;
};

const calculateAmount = async (account) => {
  const results = {};
  const facts = {};
  facts.WaterConsumption = getWaterConsumption(account);
  facts.WaterAccount = getWaterAccount(account);
  facts.WaterworksAttribute = getWaterAttribute(account);

  const rules = await getRules("consumption");
  for (let i = 0; i < rules.length; i++) {
    let executed = rules[i](facts, results);
    if (executed == true) break;
  }
  account.amount = facts.WaterConsumption.amount;
};

const buildBillItems = async (batch, account) => {
  const results = [];
  const facts = {};
  facts.WaterBill = getWaterBill(batch);
  facts.WaterConsumption = getWaterConsumption(account);

  const rules = await getRules("billing");
  for (let i = 0; i < rules.length; i++) {
    let executed = rules[i](facts, results);
    if (executed == true) break;
  }
  account.billitems = results;
};

const calcBillTotal = (account) => {
  account.total = account.balanceforward;
  account.billitems.forEach((item) => {
    account.total += item.amount;
  });
};

export const saveReading = (batch, account, reading, imageUrl) => {
  return async (dispatch) => {
    const updatedAccount = { ...account };
    updatedAccount.reading = reading;
    updatedAccount.photourl = imageUrl;
    if (updatedAccount.reading < updatedAccount.prevreading) {
      updatedAccount.volume =
        updatedAccount.reading +
        updatedAccount.metercapacity -
        updatedAccount.prevreading;
    } else {
      updatedAccount.volume =
        updatedAccount.reading - updatedAccount.prevreading;
    }
    await calculateAmount(updatedAccount);
    await buildBillItems(batch, updatedAccount);
    calcBillTotal(updatedAccount);
    await db.update({ schema }, updatedAccount);
    dispatch(setSelectedAccount(updatedAccount));
  };
};

export const submitReading = (account, batch) => {
  return async (dispatch) => {
    const updatedAccount = { ...account };
    updatedAccount.state = 1;
    updatedAccount.readingdate = new Date();
    await db.update({ schema }, updatedAccount);
    await dispatch(batchActions.updateReadCount(batch));
    dispatch(setSelectedAccount(updatedAccount));
  };
};

export const billPrinted = (account) => {
  return async (dispatch) => {
    const updatedAccount = { ...account };
    updatedAccount.state = 2;
    await db.update({ schema }, updatedAccount);
    dispatch(setSelectedAccount(updatedAccount));
  };
};

export const buildWhere = (batchId, filter) => {
  const filters = {};
  if (filter && filter.searchText) {
    filters.meterserialno = filter.searchText;
    filters.acctname = filter.searchText;
    filters.acctno = filter.searchText;
  }

  const whereStmts = [];
  const whereFields = buildWhereFields(filters);

  if (whereFields.length > 0) {
    whereStmts.push("(" + whereFields.join(" OR ") + ")");
  }

  whereStmts.push("batchid = :batchid");
  filters.batchid = batchId;

  switch (filter.name) {
    case "stubout":
      if (filter.stuboutid) {
        whereStmts.push("stuboutid = :stuboutid");
        filters.stuboutid = filter.stuboutid;
      }
      break;

    case "unread":
      whereStmts.push("state = 0");
      break;

    case "completed":
      whereStmts.push("state >= 1");
      break;

    case "unmapped":
      whereStmts.push("(lat IS NULL OR lng IS NULL)");
      break;
  }
  return [whereStmts.join(" AND "), filters];
};

const buildWhereFields = (filters) => {
  const whereArr = [];
  for (key in filters) {
    if (filters.hasOwnProperty(key)) {
      whereArr.push(`${key} LIKE :${key}`);
      filters[key] = `${filters[key]}%`;
    }
  }
  return whereArr;
};
