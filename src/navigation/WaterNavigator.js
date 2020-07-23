import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createTabNavigator, defaultNavigationOptions } from "../rsi-react-native/lib/react-native-tabs";


import LogoutScreen from "../screens/LogoutScreen";
import BatchListScreen from "../screens/water/BatchListScreen";
import DownloadBatchScreen from "../screens/water/DownloadBatchScreen";
import AccountListScreen from "../screens/water/AccountListScreen";
import AccountScreen from "../screens/water/AccountScreen";
import MeterReadingScreen from "../screens/water/MeterReadingScreen";

import GeoTagScreen from "../screens/geo/GeoTagScreen";
import MapScreen from "../screens/geo/MapScreen";

import SettingsScreen from "../screens/setting/SettingsScreen";
import ConnectionSettingScreen from "../screens/setting/ConnectionSettingScreen";
import RuleListSettingScreen from "../screens/setting/RuleListSettingScreen";
import RuleSettingScreen from "../screens/setting/RuleSettingScreen";
import PrinterSetupScreen from "../screens/setting/PrinterSetupScreen";
import StuboutListScreen from "../screens/water/components/StuboutListScreen";


const LogoutNavigator = createStackNavigator(
  {
    Logout: LogoutScreen,
  },
  defaultNavigationOptions
);


const WaterNavigator = createStackNavigator(
  {
    Home: BatchListScreen,
    DownloadBatch: DownloadBatchScreen,
    Accounts: AccountListScreen,
    Account: AccountScreen,
    Stubouts: StuboutListScreen,
    Meter: MeterReadingScreen,
    GeoTag: GeoTagScreen,
    Map: MapScreen,
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
  {name: 'Logout', screen: LogoutNavigator, icon: "log-out" },
  {name: 'Home', screen: WaterNavigator, icon: "home", IsInitialRoute: true },
  {name: 'Settings', screen: SettingNavigator, icon: "settings"},
]

export default createTabNavigator(tabs);
