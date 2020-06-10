import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { UITheme } from "../../rsi-react-native";
import PropTypes from "prop-types";

const propTypes = {
  text: PropTypes.string.isRequired,
  hide: PropTypes.bool,
  style: PropTypes.shape({
    container: View.styles,
    text: Text.styles,
  }),
};

const defaultProps = {
  text: "Status",
  hide: false,
  style: {},
};

const getStyles = (props) => {
  return {
    container: [localStyles.container, props.style.container],
    text: [localStyles.text, props.style.text],
  };
};

const Status = (props) => {
  if (props.hide) return null;
  const styles = getStyles(props);
  return (
    <View style={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.text}</Text>
        {props.children}
      </View>
    </View>
  );
};

Status.propTypes = propTypes;
Status.defaultProps = defaultProps;

const localStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: UITheme.fonts.medium,
  },
});

export default Status;
