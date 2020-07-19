import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import { createTabNavigator, defaultNavigationOptions } from "../rsi-react-native/lib/react-native-tabs";

import LoginScreen from "../screens/LoginScreen";
import SettingsScreen from "../screens/setting/SettingsScreen";
import ConnectionSettingScreen from "../screens/setting/ConnectionSettingScreen";
import RuleListSettingScreen from "../screens/setting/RuleListSettingScreen";
import RuleSettingScreen from "../screens/setting/RuleSettingScreen";
import PrinterSetupScreen from "../screens/setting/PrinterSetupScreen";



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
    Computation: RuleListSettingScreen,
    Billing: RuleListSettingScreen,
    Rule: RuleSettingScreen,
    Printer: PrinterSetupScreen,
  },
  defaultNavigationOptions
);

const tabs = [
  {name: 'Login', screen: AuthNavigator, icon: "log-in" },
  {name: 'Settings', screen: SettingNavigator, icon: "settings"},
]

export default createTabNavigator(tabs);
