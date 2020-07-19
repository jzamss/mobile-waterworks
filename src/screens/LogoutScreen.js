import React from "react";
import { useDispatch } from "react-redux";
import { NavigationActions } from "react-navigation";
import { LogoutComponent } from "../rsi-react-native";

import * as authActions from "../store/actions/auth";

const LogoutScreen = (props) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    NavigationActions.navigate({ routeName: "Login" });
  };

  return (
    <LogoutComponent
      logo={require("../../assets/icon.png")}
      onLogout={logoutHandler}
    />
  );
};

LogoutScreen.navigationOptions = (navData) => {
  return {
    headerShown: false,
  };
};

export default LogoutScreen;
