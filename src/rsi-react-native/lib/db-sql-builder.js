import models from "../../models/models";

/*========================================================
* params fields:
*   schema - required
*   select - string of comma separated fields
*          - if not specified, get fields from schema/model
*   where  - an array  
*               ['basic where cause']
*               ['where cause with dynamic args ? ', [args]]
*   orderBy
*   start  - base 0
*   limit  -  
*  __DEBUG__
========================================================*/
export const getListSql = (params) => {
  const { schema } = params;
  if (!schema) throw new Error("schema must be specified.");
  const ModelClass = models[schema];
  if (!ModelClass) throw new Error(`Model ${schema} is not registered.`);

  const model = new ModelClass();
  const [fieldSql] = getSelectFields(params, model);
  const [whereSql, values] = getWhereClause(params);
  const orderBySql = getOrderByClause(params);
  const limitSql = getLimitClause(params);

  const stmt = [];
  stmt.push("SELECT");
  stmt.push(fieldSql);
  stmt.push("FROM " + schema);
  whereSql && stmt.push(whereSql);
  orderBySql && stmt.push(orderBySql);
  limitSql && stmt.push(limitSql);
  const sql = stmt.join(" ");

  if (params.__DEBUG__) {
    logDebugInfo(sql, values);
  }

  return [sql, values];
};

export const getBySql = (params) => {
  if (!params.sql) throw new Error("sql must be specified.");

  const [whereSql, values] = getWhereClause(params);
  const orderBySql = getOrderByClause(params);
  const limitSql = getLimitClause(params);

  const stmt = [];
  stmt.push(params.sql);
  whereSql && stmt.push(whereSql);
  orderBySql && stmt.push(orderBySql);
  limitSql && stmt.push(limitSql);
  const sql = stmt.join(" ");

  if (params.__DEBUG__) {
    logDebugInfo(sql, values);
  }

  return [sql, values];
};

export const getInsertSql = (params, data) => {
  const { schema } = params;
  if (!schema) throw new Error("schema must be specified.");
  const ModelClass = models[schema];
  if (!ModelClass) throw new Error(`Model ${schema} is not registered.`);

  const model = new ModelClass();
  const [fieldSql, fields] = getInsertFields(params, model);
  const preparedValues = [];
  const values = [];

  fields.forEach((field) => {
    preparedValues.push("?");
    values.push(getResolvedValue(model, data, field));
  });

  const stmt = [];
  stmt.push("INSERT INTO " + schema + "(");
  stmt.push(fieldSql);
  stmt.push(") VALUES (");
  stmt.push(preparedValues.join(","));
  stmt.push(")");
  const sql = stmt.join(" ");

  if (params.__DEBUG__) {
    logDebugInfo(sql, values);
  }

  return [sql, values];
};

export const getUpdateSql = (params, data) => {
  const { schema } = params;
  if (!schema) throw new Error("schema must be specified.");
  const ModelClass = models[schema];
  if (!ModelClass) throw new Error(`Model ${schema} is not registered.`);

  const model = new ModelClass();
  const [updateSql, fields, whereValues] = getUpdateFields(params, data, model);
  const values = [];

  fields.forEach((field) => {
    values.push(getResolvedValue(model, data, field));
  });
  values.push(...whereValues);

  const stmt = [];
  stmt.push("UPDATE " + schema + " SET");
  stmt.push(updateSql);

  const sql = stmt.join(" ");

  if (params.__DEBUG__) {
    logDebugInfo(sql, values);
  }

  return [sql, values];
};

export const getDeleteSql = (params) => {
  const { schema } = params;
  if (!schema) throw new Error("schema must be specified.");
  const ModelClass = models[schema];
  if (!ModelClass) throw new Error(`Model ${schema} is not registered.`);

  const [whereSql, values] = getWhereClause(params);

  const stmt = [];
  stmt.push("DELETE FROM " + schema);
  whereSql && stmt.push(whereSql);
  const sql = stmt.join(" ");

  if (params.__DEBUG__) {
    logDebugInfo(sql, values);
  }

  return [sql, values];
};

const getSelectFields = (params, model) => {
  let fields = [];
  let fieldSql = "";

  if (params.select) {
    fieldSql = params.select;
    fields = params.select.replace(/ */g, "").split(/,/);
  } else {
    for (key in model) {
      if (key.startsWith("_")) continue;
      if (model.hasOwnProperty(key)) {
        fields.push(key);
      }
    }
    fieldSql = fields.join(", ");
  }
  return [fieldSql, fields];
};

const getWhereClause = (params) => {
  let whereSql = null;
  let values = [];
  const { where } = params;

  if (where && where.length > 0 && where[0]) {
    whereSql = "WHERE " + where[0].replace(/:[a-zA-Z]+/g, "?");
    if (where.length > 1) {
      const fields = where[0].match(/:[a-zA-Z]+/g);
      if (fields) {
        fields.forEach((fld) => {
          values.push(where[1][fld.replace(":", "")]);
        });
      }
    }
  }

  return [whereSql, values];
};

const getLimitClause = (params) => {
  const { start, limit } = params;

  const limitArr = [];
  if (start && start > 0) {
    limitArr.push(start);
  }
  if (limit && limit > 0) {
    limitArr.push(limit);
  }

  let limitSql = null;
  if (limitArr.length > 0) {
    limitSql = "LIMIT " + limitArr.join(",");
  }

  return limitSql;
};

const getOrderByClause = (params) => {
  const { orderBy } = params;
  return orderBy && `ORDER BY ${orderBy}`;
};

const getInsertFields = (params, model) => {
  const fields = [];
  for (key in model) {
    if (key.startsWith("_")) continue;
    if (model.hasOwnProperty(key)) {
      fields.push(key);
    }
  }
  return [fields.join(", "), fields];
};

const getUpdateFields = (params, data, model) => {
  const updateFields = [];
  let fields = [];
  let hasObjid = false;

  for (key in data) {
    if (key.startsWith("_")) continue;
    if (model.hasOwnProperty(key)) {
      if (key === "objid") {
        hasObjid = true;
      } else {
        updateFields.push(key + "=?");
        fields.push(key);
      }
    }
  }

  let updateSql = updateFields.join(", ");

  const [whereClause, values] = getWhereClause(params);

  if (!whereClause) {
    if (hasObjid) {
      updateSql += " WHERE objid=?";
      fields.push("objid");
    }
  } else {
    updateSql += " " + whereClause;
  }

  return [updateSql, fields, values];
};

const getResolvedValue = (model, data, key) => {
  const { _serializer } = model;
  const dataSerializer = _serializer && _serializer[key];
  if (dataSerializer) {
    return dataSerializer(data[key]);
  } else {
    return data[key];
  }
};

const logDebugInfo = (sql, data) => {
  console.log("sql: ", sql);
  console.log("data: ", data);
};
