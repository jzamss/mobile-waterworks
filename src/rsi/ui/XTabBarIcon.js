import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors"

const XTabBarIcon = (props) => {
  const size = !props.size && 25;
  const color = !props.color && Colors.tabActiveColor;
  const icon = (Platform.OS === "android" ? "md-" : "ios-") + props.icon;
  return <Ionicons name={icon} size={size} color={color} />;
};

export default XTabBarIcon;
