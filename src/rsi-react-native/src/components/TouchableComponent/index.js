import React from "react";
import { Platform } from "react-native";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native-gesture-handler";

const TouchableComponent = ({ children, ...rest }) => {
  if (Platform.OS === "android" && Platform.Version >= 21) {
    return (
      <TouchableNativeFeedback {...rest}>{children}</TouchableNativeFeedback>
    );
  }
  return <TouchableOpacity {...rest}>{children}</TouchableOpacity>;
};

export default TouchableComponent;
