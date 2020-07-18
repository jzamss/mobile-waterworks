const fetch = require("node-fetch");
import * as db from "../rsi/db";

let connection;

const services = {};

const escapeMethodName = (name) => {
  if (/(delete|export|function|var|yield)/i.test(name)) {
    return `_${name}`;
  }
  return name;
};

const buildFunctionString = (sinfo) => {
  let func = "function " + sinfo.serviceName + "(p) {\n";
  func += "this.proxy = p;\n";
  const keys = Object.keys(sinfo.methods);
  for (let i = 0; i < keys.length; i++) {
    const methodName = keys[i];
    const method = sinfo.methods[methodName];
    let args = "";
    let params = "";
    for (let idx = 0; idx < method.parameters.length; idx++) {
      args += `p${idx}`;
      if (idx > 0) params += ", ";
      params += `p${idx}`;
    }
    func += "this." + escapeMethodName(methodName) + "= function(";
    func += args + (args.length > 0 ? "," : "");
    func += "handler) {\n";
    func += 'return this.proxy.invoke("' + methodName + '",';
    func += "[" + params + "]";
    func += ", handler );\n";
    func += "};\n";
  }
  func += "}";
  return func;
};

const buildServiceMeta = async (serviceName) => {
  if (!connection) {
    connection = await db.find({ schema: "connection" });
  }

  let url = connection.secured ? "https://" : "http://";
  url += connection.ipaddress;
  url += ":" + (connection.port || "9070");
  url += "/" + (connection.cluster || "osiris3");
  url += "/json";
  url += "/" + (connection.context || "enterprise");
  url += "/" + serviceName + ".metaInfo";

  const retVal = await fetch(url);
  if (retVal.status !== 200) {
    throw retVal.statusText;
  }
  try {
    const sinfo = await retVal.json();
    return buildFunctionString(sinfo);
  }catch (err) {
    console.log("ERROR", err);
    throw "Response from server is invalid. Kindly request assistance from system administrator.";
  }
};

export const getService = async (methodName, action) => {
  if (!connection) {
    connection = await db.find({ schema: "connection" });
  }

  let url = connection.secured ? "https://" : "http://";
  url += connection.ipaddress;
  url += ":" + (connection.port || "9070");
  url += "/" + (connection.cluster || "osiris3");
  url += "/json";
  url += "/" + (connection.context || "enterprise");
  url += "/" + methodName;
  url += "." + action;

  const invoke = async (args) => {
    const hasArgs = Array.isArray(args) && args.length > 0;
    const response = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: hasArgs ? JSON.stringify(args[0]) : "",
    });
    
    if (response.status !== 200) {
      throw response.statusText;
    } else {
      return await response.json();
    }
  };
  return { invoke };
};

export const getServiceMeta = async (serviceName, connection) => {
  let service = services[serviceName];
  if (!service) {
    service = await buildServiceMeta(serviceName, connection);
    services[serviceName] = service;
  }
  return service;
};
