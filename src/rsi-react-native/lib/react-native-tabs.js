import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Colors from "../src/constants/Colors";
import TabBarIcon from "../src/ui/TabBarIcon";

export const defaultNavigationOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  },
};

export const createTabNavigator = (tabs) => {
  let initialRoute = tabs[0].name;
  const tabConfig = {};
  tabs.forEach((tab) => {
    tabConfig[tab.name] = {
      screen: tab.screen,
      navigationOptions: {
        tabBarIcon: (tabInfo) => <TabBarIcon icon={tab.icon} />,
        tabBarColor: Colors.tabBarColor,
      },
    };
    if (tab.IsInitialRoute) {
      initialRoute = tab.name;
    }
  });

  return Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabConfig, {
        activeColor: Colors.tabTitleColor,
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primary,
          borderTopColor: Colors.tabBorderTopColor,
          borderTopWidth: 1,
        },
        initialRouteName: initialRoute,
      })
    : createBottomTabNavigator(tabConfig, {
        tabBarOptions: {
          activeTintColor: Colors.primary,
          inactiveTintColor: Colors.tabInactiveColor,
        },
        initialRouteName: initialRoute,
      });
};
