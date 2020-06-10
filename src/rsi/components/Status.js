import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Fonts } from "../rsi-react-native";

const Status = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      {props.text && <Text style={{...styles.text, ...props.textStyle}}>{props.text}</Text>}
      {props.error && <Text style={{...styles.text, ...props.errorStyle}}>{props.error}</Text>}
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: Fonts.medium,
  },
});

export default Status;
