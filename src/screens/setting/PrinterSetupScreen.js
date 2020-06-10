import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { XButton, XLabelInput } from "../../rsi/rsi-react-native";

const PrinterSetupScreen = (props) => {
  const printHandler = () => {
    console.log("print test...");
  };

  return (
    <View>
      <Text>Printer Setup</Text>
      <XButton title="Print Test" onPress={printHandler} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PrinterSetupScreen;
