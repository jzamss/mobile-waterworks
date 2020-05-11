import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createTabNavigator, defaultNavigationOptions } from "../rsi/rsi-react-native-tabs";


import LogoutScreen from "../screens/LogoutScreen";
import BatchListScreen from "../screens/water/BatchListScreen";
import AddBatchScreen from "../screens/water/AddBatchScreen";
import AccountListScreen from "../screens/water/AccountListScreen";
import AccountScreen from "../screens/water/AccountScreen";
import MeterReadingScreen from "../screens/water/MeterReadingScreen";

import GeoTagScreen from "../screens/geo/GeoTagScreen";
import MapScreen from "../screens/geo/MapScreen";

import SettingsScreen from "../screens/setting/SettingsScreen";
import ConnectionSettingScreen from "../screens/setting/ConnectionSettingScreen";
import RateListSettingScreen from "../screens/setting/RateListSettingScreen";
import RateSettingScreen from "../screens/setting/RateSettingScreen";
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
    AddBatch: AddBatchScreen,
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
    Rates: RateListSettingScreen,
    Rate: RateSettingScreen,
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
