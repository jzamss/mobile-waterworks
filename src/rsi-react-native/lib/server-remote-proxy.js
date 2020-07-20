import * as serviceMgr from "./service-manager";

const toFunc = (strFunc) => {
  return eval("(" + strFunc + ")");
};

const findLocalService = async ({ serviceName, connectionType, debug }) => {
  const funcStr = await serviceMgr.getServiceMeta(serviceName, connectionType);
  const Func = toFunc(funcStr);
  return new Func(LocalProxy(serviceName, connectionType));
};

const LocalProxy = (name, connectionType) => {
  const invoke = async (action, args) => {
    try {
      const svc = await serviceMgr.getService(name, action, connectionType);
      const ret = await svc.invoke(args);
      if (ret.status === "OK") {
        return ret.data;
      } else if (/.*err.*/i.test(ret.status)) {
        throw ret.message
      } else {
        return ret;
      }
    } catch (err) {
      if (/.*json.*/i.test(err.toString())) {
        console.log("INVOKE ERROR", err)
        throw "Invalid data received."
      }
      throw err.toString();
    }
  };
  return { invoke };
};

const serviceCache = {};

const getService = (options = { debug: false }) => {
  const lookup = async (serviceName, connectionType = "waterworks") => {
    if (serviceCache[serviceName] == null) {
      const svc = await findLocalService({
        serviceName,
        connectionType,
        ...options,
      });
      serviceCache[serviceName] = svc;
    }
    return serviceCache[serviceName];
  };

  return {
    lookup,
  };
};

export default getService;
