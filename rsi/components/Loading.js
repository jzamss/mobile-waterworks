import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

const Loading = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
