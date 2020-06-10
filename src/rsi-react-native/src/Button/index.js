import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";

import uiTheme from "../Theme";

const Button = (props) => {
  let ButtonComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  const backgroundColor = props.color || uiTheme.button.color;
  const width = props.width || null;

  return (
    <View style={{ ...styles.buttonContainer, ...props.style }}>
      <ButtonComponent onPress={props.onPress} activeOpacity={0.7}>
        <View style={{ ...styles.button, ...{ backgroundColor, width } }}>
          <Text style={styles.buttonText}>{props.title}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  button: {
    backgroundColor: uiTheme.button.color,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: "white",
    fontSize: uiTheme.fonts.large,
    textAlign: "center",
  },
  rounded: {
    borderWidth: 1,
    borderRadius: 20,
    elevation: 2,
  },
});

export default Button;
