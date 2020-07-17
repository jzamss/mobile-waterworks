import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  ActivityIndicator
} from "react-native";

import Colors from "../constants/Colors"
import Fonts from "../constants/Fonts"


const XButton = (props) => {
  let ButtonComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  const backgroundColor = props.color || Colors.buttonColor;
  let pressHandler = () => {};
  if (!props.processing) pressHandler = props.onPress;

  return (
    <View style={{ ...styles.buttonContainer, ...props.style }}>
      <ButtonComponent onPress={pressHandler} activeOpacity={0.7}>
        <View style={{ ...styles.button, ...{ backgroundColor } }}>
          <Text style={styles.buttonText}>{props.title}</Text>
          {props.processing && <ActivityIndicator color="white" />}
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 20,
    overflow: "hidden",
    margin: 5,
  },
  button: {
    backgroundColor: Colors.buttonColor,
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  buttonText: {
    color: "white",
    fontSize: Fonts.large,
    textAlign: "center",
    paddingHorizontal: 5,
  },
  rounded: {
    borderWidth: 1,
    borderRadius: 20,
    elevation: 2,
  },
});

export default XButton;
