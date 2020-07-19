import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

const Error = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorTitle}>Error</Text>
      <Text style={styles.errorText}>{props.text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        // borderWidth: 1,
        // borderColor: Colors.errorBorder,
        // backgroundColor: Colors.errorBackground,
        // width: '60%'
    },
    errorTitle: {
        fontSize: Fonts.large,
        color: Colors.error,
    },
    errorText: {
        fontSize: Fonts.medium,
    },
});

export default Error;
