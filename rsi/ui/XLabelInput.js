import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Fonts from "../constants/Fonts"
import XInput from "./XInput"

const XLabelInput = props => {
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <XInput
        {...props}
        style={{ ...styles.input, ...props.style }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%"
  },
  label: {
    marginVertical: 8,
    fontSize: Fonts.medium,
    fontWeight: 'bold',
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    fontSize: Fonts.medium
  },
});

export default XLabelInput;
