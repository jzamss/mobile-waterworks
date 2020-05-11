import React, { useEffect } from "react";
import { NavigationActions}  from "react-navigation";
import { useDispatch } from "react-redux";
import { View, Image, StyleSheet } from "react-native";

import * as settingActions from '../store/actions/settings';

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadConnectionSetting = async () => {
      dispatch(settingActions.loadConnection());
      NavigationActions.navigate({routeName: "Login"});
    };

    loadConnectionSetting();
  }, []);

  return (
    <View style={styles.screen}>
      <Image style={styles.icon} source={require("../assets/icon.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  icon: {
    width: 350,
    height: 350,
  },
});

export default StartupScreen;
