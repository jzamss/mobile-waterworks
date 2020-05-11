import * as db from "../../rsi/db";
import * as batchActions from "../../store/actions/batch";

const schema = "account";

export const SET_ACCOUNTS = "SET_ACCOUNTS";
export const SET_ACCOUNT = "SET_ACCOUNT";

export const loadAccounts = (batchId, stuboutId) => {
  return async (dispatch) => {
    const where = { batchid: batchId }
    if (stuboutId ) {
      where.stuboutid = stuboutId;
    };
    const params = { schema, where };
    const accounts = await db.getList(params);
    dispatch({ type: SET_ACCOUNTS, accounts });
  };
};

export const setSelectedAccount = (account) => {
  return { type: SET_ACCOUNT, account };
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

export const saveReading = (account, reading, imageUrl) => {
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
    await db.update({ schema }, updatedAccount);
    dispatch(setSelectedAccount(updatedAccount));
  };
};

export const submitReading = (account, batch) => {
  return async (dispatch) => {
    const updatedAccount = { ...account };
    updatedAccount.state = 1;
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

export const searchAccounts = (searchType) => {
  return async (dispatch) => {
    const { name, stuboutid, filters } = searchType;

    const whereStmts = [];
    const whereFields = buildWhereFields(filters);

    if (whereFields.length > 0) {
      whereStmts.push("(" + whereFields.join(" OR ") + ")");
    }

    switch (name) {
      case "stubout":
        if (stuboutid) {
          whereStmts.push("stuboutid = :stuboutid");
          filters.stuboutid = stuboutid;
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

    let where = [whereStmts.join(" AND "), filters];
    const params = { schema, where };
    const accounts = await db.getList(params);
    return dispatch({ type: SET_ACCOUNTS, accounts });
  };
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
