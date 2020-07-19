import React from "react";
import { Platform } from "react-native";
import { HeaderButton as NavHeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

const HeaderButton = (props) => {
  return (
    <NavHeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.primary}
    />
  );
};

export default HeaderButton;
