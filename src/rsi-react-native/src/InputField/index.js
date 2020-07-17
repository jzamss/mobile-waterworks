import React, { Component } from "react";
import { View, StyleSheet, Platform, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import uiTheme from "../Theme"

class InputField extends Component {
  state = {
    value: this.props.initialValue,
    isDirty: false,
  };

  textChangeHandler = (text) => {
    this.setState({ value: text });
    this.props.onInputChange(this.props.id, text);
  };

  lostFocusHandler = () => {
    if (this.state.value && this.state.value.length > 0) {
      this.setState({ isDirty: true });
    }
  };

  componentDidMount() {
    if (!!this.props.clear) {
      setValue(null);
      this.setState({ value: null });
    }
  }

  getIconComponent = () => {
    if (!this.props.icon) return null;

    const icon = (Platform.OS === "android" ? "md-" : "ios-") + this.props.icon;
    return (
      <Ionicons
        name={icon}
        size={30}
        color={uiTheme.colors.primary}
      />
    );
  };

  render() {
    const rounded = this.props.rounded ? styles.rounded : {};
    return (
      <View
        style={{
          ...styles.inputContainer,
          ...rounded,
          ...{width: this.props.width || null},
          ...this.props.containerStyle
        }}
      >
        {this.getIconComponent()}
        <TextInput
          {...this.props}
          style={{ ...styles.input, ...this.props.inputStyle }}
          value={this.state.value}
          onChangeText={this.textChangeHandler}
          onBlur={this.lostFocusHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: uiTheme.text.borderWidth,
    borderColor: uiTheme.text.borderColor,
    padding: uiTheme.layout.padding,
    margin: uiTheme.layout.margin,
    paddingLeft: 50,
  },
  rounded: {
    borderRadius: 20,
    elevation: 2,
  },
  input: {
    paddingLeft: 10,
    fontSize: uiTheme.fonts.large,
    color: uiTheme.text.color
  },
});

export default InputField;
