import * as SQLite from "expo-sqlite";
import * as sqlBuilder from "./db-sql-builder";

import models from "../../models/models";

let db;

const initTable = (createTableSql) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        createTableSql,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

const initTables = async (tables) => {
  let promises = [];
  tables.forEach((table) => {
    promises.push(initTable(table));
  });

  Promise.all(promises)
    .then(() => console.log("Tables initialized."))
    .catch((err) => {
      console.log("Initializing table failed.");
      console.log("[ERROR]", err);
      throw err;
    });
};

const executeSql = (sql, params) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const initDb = (dbName, tables) => {
  db = SQLite.openDatabase(dbName);

  initTables(tables)
    .then(() => console.log(`${dbName} database initialized.`))
    .catch((err) => {
      console.log(`Initializing ${dbName} database failed.`);
      console.log("[ERROR]", err);
    });
};

export const getBySql = async (params) => {
  resolveFindBy(params);
  const [sql, values] = sqlBuilder.getBySql(params);
  const dbResult = await executeSql(sql, values);

  const list = [];
  if (dbResult.rows.length > 0) {
    dbResult.rows._array.forEach((item) => {
      const newItem = {};
      for (key in item) {
        newItem[key] = item[key];
      }
      list.push(newItem);
    });
  }
  return list;
};

export const findBySql = async (params) => {
  params.limit = 1;
  const list = await getList(params);
  return list ? list[0] : null;
};


export const getList = async (params) => {
  resolveFindBy(params);
  const [sql, values] = sqlBuilder.getListSql(params);
  const dbResult = await executeSql(sql, values);

  const list = [];
  if (dbResult.rows.length > 0) {
    dbResult.rows._array.forEach((item) => {
      const newModel = new models[params.schema]();
      for (key in item) {
        newModel[key] = resolveData(newModel, item, key);
      }
      list.push(newModel);
    });
  }
  return list;
};

export const find = async (params) => {
  resolveFindBy(params);
  params.limit = 1;
  const list = await getList(params);
  return list ? list[0] : null;
};

export const create = async (params, data = {}) => {
  const [sql, values] = sqlBuilder.getInsertSql(params, data);
  try {
    await executeSql(sql, values);
    return data;
  } catch (err) {
    console.log("insert error", err);
    throw err;
  }
};

export const update = async (params, data = {}) => {
  const [sql, values] = sqlBuilder.getUpdateSql(params, data);
  try {
    await executeSql(sql, values);
    return data;
  } catch (err) {
    console.log("update error", err);
    throw err;
  }
};

export const remove = async (params) => {
  resolveFindBy(params);
  const [sql, values] = sqlBuilder.getDeleteSql(params);
  try {
    await executeSql(sql, values);
  } catch (err) {
    console.log("delete error", err);
    throw err;
  }
};

export const createEntity = (ModelClass, data) => {
  const entity = new ModelClass();
  for (key in entity) {
    if (entity.hasOwnProperty(key)) {
      entity[key] = resolveData(entity, data, key);
    }
  }
  return entity;
};

const resolveData = (model, data, key) => {
  const { _deserializer } = model;
  const dataDeserializer = _deserializer && _deserializer[key];
  if (dataDeserializer) {
    return dataDeserializer(data[key]);
  } else {
    return data[key];
  }
};


const resolveFindBy = (params) => {
  const findBy = params.where;
  if (findBy && !Array.isArray(findBy) && typeof findBy === "object") {
    // this is a map, convert to where specs ['a = :a', {:}]
    const whereClause = [];
    for (key in findBy) {
      whereClause.push(`${key} = :${key}`);
    }
    params.where = [whereClause.join(" AND "), findBy];
  }
};