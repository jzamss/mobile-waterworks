import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import Input from "../Input";

const IconInput = (props) => {
  const icon = (Platform.OS === "android" ? "md-" : "ios-") + props.icon;
  const rounded = props.rounded ? styles.rounded : {};
  return (
    <View style={{ ...styles.inputContainer, ...rounded, ...props.style }}>
      {props.icon && (
        <Ionicons
          style={styles.inputIcon}
          name={icon}
          size={30}
          color={Colors.primary}
        />
      )}
      <Input {...props} inputStyle={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#AAA",
    padding: 5,
    margin: 5,
  },
  rounded: {
    borderRadius: 20,
    elevation: 2,
  },
  inputIcon: {
    paddingLeft: 80,
    paddingRight: 20,
  },
  input: {
    fontSize: Fonts.large,
  },
});

export default IconInput;
