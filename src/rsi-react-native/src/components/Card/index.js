import React from "react";
import { View, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: Colors.cardBorder,
    elevation: 50,
  }
});

export default Card;
