import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import { createTabNavigator, defaultNavigationOptions } from "../rsi/rsi-react-native-tabs";

import LoginScreen from "../screens/LoginScreen";
import SettingsScreen from "../screens/setting/SettingsScreen";
import ConnectionSettingScreen from "../screens/setting/ConnectionSettingScreen";
import PrinterSetupScreen from "../screens/setting/PrinterSetupScreen";

import RateListSettingScreen from "../screens/setting/RateListSettingScreen";
import RateSettingScreen from "../screens/setting/RateSettingScreen";



const AuthNavigator = createStackNavigator(
  {
    Login: LoginScreen,
  },
  defaultNavigationOptions
);

const SettingNavigator = createStackNavigator(
  {
    Settings: SettingsScreen,
    Connection: ConnectionSettingScreen,
    Rates: RateListSettingScreen,
    Rate: RateSettingScreen,
    Printer: PrinterSetupScreen,
  },
  defaultNavigationOptions
);

const tabs = [
  {name: 'Login', screen: AuthNavigator, icon: "log-in" },
  {name: 'Settings', screen: SettingNavigator, icon: "settings"},
]

export default createTabNavigator(tabs);
