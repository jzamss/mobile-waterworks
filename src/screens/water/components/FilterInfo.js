import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../rsi-react-native";

const FilterInfo = ({ info }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>{info}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginVertical: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.searchBorder,
  },
  infoText: {
    fontSize: Fonts.medium,
    fontWeight: "bold",
  },
});

export default FilterInfo;
