import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  Platform,
} from "react-native";

import { Colors, Fonts } from "../rsi-react-native";

const SimpleListItem = (props) => {
  let TouchableComp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <TouchableComp onPress={() => props.onPress(props.data)}>
        {props.children ? (
          props.children
        ) : (
          <Text style={styles.title}>{props.title}</Text>
        )}
      </TouchableComp>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    paddingHorizontal: 20,
    borderBottomColor: Colors.listItemBorder,
    borderBottomWidth: 2,
    justifyContent: "center",
  },
  title: {
    fontSize: Fonts.large,
  },
});

export default SimpleListItem;
