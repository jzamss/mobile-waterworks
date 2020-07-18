import { getUniqueId } from 'react-native-device-info';
import * as db from "../../rsi/db";

import getService from "../../rsi/server-remote-proxy";
const Service = getService();

export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";

const schema = "user";

export const loadTerminal = async (Modes) => {
  try {
    const terminal = await recoverTerminal();
    return Modes.login;
  } catch (err) {
    return Modes.initial;
  }
}

export const registerTerminal = async (terminal) => {
  try {
    const deviceId = getUniqueId();
    terminal.macaddress = deviceId;
    const svc = await Service.lookup("MobileTerminalService");
    return await svc.register(terminal);
  } catch (err) {
    console.log("recoverTerminal ERROR", err);
    throw "An error occured registering terminal. Please try again."
  }
}

export const recoverTerminal = async () => {
  const deviceId = getUniqueId();
  try {
    const svc = await Service.lookup("MobileTerminalService");
    return await svc.recover({macaddress: deviceId});
  } catch (err) {
    console.log("recoverTerminal ERROR", err);
    throw "Terminal is not yet registered."
  }
}

export const login = (user) => {
  return async (dispatch) => {
    if (!user.username || !user.password) {
      throw ("Verify your username and password.");
    }
    try {
      const authenticatedUser = await authenticate(user);
      return dispatch({ type: SET_USER, user: authenticatedUser });
    } catch (err) {
      throw err.toString()
    }
  };
};

export const logout = () => {
  return { type: RESET_USER };
};

const authenticate = async (user) => {
  const svc = await Service.lookup("MobileTerminalService");
  console.log("svc", svc);

  let authenticatedUser  = await getLocalUser(user);
  if (!authenticatedUser) {
    authenticatedUser = await authenticateServerUser(user);
  }
  return authenticatedUser;
};

const getLocalUser = async (user) => {
  const params = { schema, where: { username: user.username }};
  const localUser = await db.find(params);
  if (localUser && localUser.password !== user.password)  {
    throw 'Invalid username or password.'
  }
  return localUser;
};

const authenticateServerUser = async (user) => {
  //TODO
  //simulate server call
  const fetchUserPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      user.objid = 'USR5b13925b:17066eb8fad:-7eac';
      resolve(user);
    }, 500);
  });

  try {
    // const svc = await Service.lookup("LoginService");
    // user.env = {CLIENTTYPE: 'mobile'};
    // const xuser = await svc.login(user);
    // console.log("USER", xuser);
    const authenticatedUser = await fetchUserPromise;
    return await db.create({schema}, authenticatedUser);
  } catch (err) {
    console.log("ERR AUTH", err);
    throw err.toString();
  }
};
