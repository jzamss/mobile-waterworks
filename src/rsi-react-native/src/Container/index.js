import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { Component } from "react";
import { PropTypes } from "prop-types";

const propTypes = {
  children: PropTypes.node.isRequired,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Container extends Component {
  render() {
    return (
      <SafeAreaView style={{ ...styles.container, ...this.props.style }}>
        {this.props.children}
      </SafeAreaView>
    );
  }
}

Container.propTypes = propTypes;

export default Container;
