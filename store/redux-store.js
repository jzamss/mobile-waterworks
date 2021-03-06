import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from "redux-thunk";

import accountReducer from "./reducers/account";
import authReducer from "./reducers/auth";
import batchReducer from "./reducers/batch";
import settingReducer from "./reducers/settings";

const rootReducers = combineReducers({
    account: accountReducer,
    batch: batchReducer,
    auth: authReducer,
    setting: settingReducer,
})

export default createStore(rootReducers, applyMiddleware(ReduxThunk));