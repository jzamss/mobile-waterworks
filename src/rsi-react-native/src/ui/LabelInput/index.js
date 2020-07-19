import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Fonts from "../../constants/Fonts"
import Input from "../Input"

const LabelInput = props => {
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <Input
        {...props}
        style={{ ...styles.input, ...props.style }}
        inputStyle={{fontSize: Fonts.large}}
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
    fontSize: Fonts.large,
    fontWeight: 'bold',
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    fontSize: Fonts.large
  },
});

export default LabelInput;
