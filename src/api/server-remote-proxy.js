import * as serviceMgr from "./service-manager";

const toFunc = (strFunc) => {
  return eval("(" + strFunc + ")");
};

const findLocalService = async ({ serviceName, module, debug }) => {
  const funcStr = await serviceMgr.getServiceMeta(serviceName);
  const Func = toFunc(funcStr);
  return new Func(LocalProxy(serviceName, module));
};

const LocalProxy = (name, module) => {
  const invoke = async (action, args) => {
    try {
      const svc = await serviceMgr.getService(name, action);
      const ret = await svc.invoke(args);
      if (ret.status === "OK") {
        return ret.data;
      } else {
        throw ret.message
      }
    } catch (err) {
      throw err.toString();
    }
  };
  return { invoke };
};

const serviceCache = {};

const getService = (options = { debug: false }) => {
  const lookup = async (serviceName, module) => {
    if (serviceCache[serviceName] == null) {
      const svc = await findLocalService({
        serviceName,
        module,
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
