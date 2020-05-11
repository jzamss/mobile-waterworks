import React from "react";
import { useDispatch } from "react-redux";
import { NavigationActions } from "react-navigation";
import { View, Image, StyleSheet } from "react-native";
import { Colors, XButton } from "../rsi/rsi-react-native";

import * as authActions from "../store/actions/auth";

const LogoutScreen = (props) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    NavigationActions.navigate({ routeName: "Login" });
  };

  return (
    <View style={styles.screen}>
      <Image style={styles.waterLogo} source={require("../assets/icon.png")} />
      <XButton color={Colors.accent} title="Logout" onPress={logoutHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  waterLogo: {
    width: 192,
    height: 192,
    marginVertical: 30,
  },
  button: {
    color: Colors.accent,
  },
});

export default LogoutScreen;
