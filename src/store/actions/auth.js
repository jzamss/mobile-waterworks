import { getUniqueId } from "react-native-device-info";
import * as db from "../../rsi-react-native/lib/db";

import getService from "../../rsi-react-native/lib/server-remote-proxy";
const Service = getService();

export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";

const schema = "user";
const terminalSchema = "terminal";

export const findTerminal = async () => {
  const deviceId = await getUniqueId();
  const terminal = await db.find({
    schema: terminalSchema,
    where: { macaddress: deviceId },
  });
  return terminal;
};

export const loadTerminal = async (Modes) => {
  try {
    const terminal = await recoverTerminal();
    return Modes.login;
  } catch (err) {
    return Modes.initial;
  }
};

export const registerTerminal = async (device) => {
  try {
    const deviceId = await getUniqueId();
    device.macaddress = deviceId;
    const svc = await Service.lookup("MobileTerminalService");
    const terminal = await svc.register(device);
    await db.create({ schema: terminalSchema, __DEBUG__: true }, terminal);
  } catch (err) {
    console.log("recoverTerminal ERROR", err);
    throw "An error occured registering terminal. Please try again.";
  }
};

export const recoverTerminal = async () => {
  const deviceId = getUniqueId();
  try {
    const svc = await Service.lookup("MobileTerminalService");
    return await svc.recover({ macaddress: deviceId });
  } catch (err) {
    console.log("recoverTerminal ERROR", err);
    throw "Terminal is not yet registered.";
  }
};

export const login = (user) => {
  return async (dispatch) => {
    if (!user.username || !user.password) {
      throw "Verify your username and password.";
    }
    try {
      user.username = user.username.toLowerCase();
      const authenticatedUser = await authenticate(user);
      return dispatch({ type: SET_USER, user: authenticatedUser });
    } catch (err) {
      throw err.toString();
    }
  };
};

export const logout = () => {
  return { type: RESET_USER };
};

const getLocalUser = async (user) => {
  const params = { schema, where: { username: user.username} };
  const localUser = await db.find(params);
  if (localUser && localUser.password !== user.password) {
    throw "Invalid username or password.";
  }
  return localUser;
};

const authenticateServerUser = async (user) => {
  try {
    // TODO: 
    // const svc = await Service.lookup("LoginService", "admin");
    // user.env = {CLIENTTYPE: 'mobile'};
    // const xuser = await svc.login(user);
    // console.log("USER", xuser);

    //SIMULATED READER/USER FOR WATERWORKS
    if (/admin/i.test(user.username)) {
      user.objid = "USR5b13925b:17066eb8fad:-7eac";
    } else {
      user.objid = user.username;
    }
    await db.create({ schema: "user" }, user);
    return await loadUsers();
  } catch (err) {
    console.log("ERR AUTH", err);
    throw err.toString();
  }
};

const authenticate = async (user) => {
  let authenticatedUser  = await getLocalUser(user);
  if (!authenticatedUser) {
    authenticatedUser = await authenticateServerUser(user);
  }
  return authenticatedUser;
};

export const loadUsers = async () => {
  return await db.getList({ schema: "user" });
};

export const removeUser = async (user) => {
  await db.remove({
    schema: "user",
    where: { objid: user.objid },
  });
  return await loadUsers();
};

