import React from "react";
import { View, StyleSheet } from "react-native";

const Separator = (props) => {
  const style = { height: props.height || 5 };
  return <View style={{ ...styles.separator, ...style }}></View>;
};

const styles = StyleSheet.create({
  height: 5,
});

export default Separator;
