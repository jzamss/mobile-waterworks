import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  TouchableNativeFeedback,
} from "react-native";

import uiTheme from "../Theme";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

const Button = (props) => {
  let ButtonComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  const backgroundColor = props.color || uiTheme.button.color;
  const width = props.width || null;
  let pressHandler = () => {};
  if (!props.processing) pressHandler = props.onPress;

  return (
    <View style={{ ...styles.buttonContainer, ...props.style }}>
      <ButtonComponent onPress={pressHandler} activeOpacity={0.7}>
        <View style={{ ...styles.button, ...{ backgroundColor } }}>
          <Text style={{ ...styles.buttonText, ...props.buttonText }}>
            {props.title}
          </Text>
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
    justifyContent: "space-evenly",
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

export default Button;
