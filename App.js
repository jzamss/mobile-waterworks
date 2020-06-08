import React from "react";
import { Provider } from "react-redux";
import { initDb } from "./api/db";

initDb({ 
  dropTables: false, 
  clearAllTables: false, 
  clearTxnTables: true,
});

import NavigationContainer from "./navigation/NavigationContainer";
import store from "./store/redux-store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
