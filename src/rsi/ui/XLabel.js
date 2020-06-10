import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Fonts from "../constants/Fonts"

const XLabel = (props) => {
  const { row } = props;
  const containerStyle = (row ? styles.labelContainerRow : styles.labelContainer)
  return (
    <View style={{ ...containerStyle, ...props.style }}>
      <Text style={{...styles.label, ...props.labelStyle}}>{props.caption}</Text>
      <Text style={{ ...styles.text, ...props.textStyle }}>{props.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    paddingVertical: 5,
  },
  labelContainerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  label: {
    fontSize: Fonts.medium,
    fontWeight: "bold",
  },
  text: {
    fontSize: Fonts.medium,
  },
});

export default XLabel;
