import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

const propTypes = {
  size: PropTypes.string,
  hide: PropTypes.bool,
  style: PropTypes.shape({
    container: View.styles,
  }),
};

const defaultProps = {
  size: 'large',
  hide: false,
  style: {},
};

const getStyles = (props) => {
  return {
    container: [localStyles.container, props.style.container],
  };
};

const Loading = (props) => {
  if (props.hide) return null;
  
  return (
    <View style={getStyles(props)}>
      <ActivityIndicator size={props.size} />
    </View>
  );
};

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
