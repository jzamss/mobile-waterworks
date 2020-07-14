import * as db from "../../rsi/db";

export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";

const schema = "user";

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

  const authenticatedUser = await fetchUserPromise;
  return await db.create({schema}, authenticatedUser);
};
