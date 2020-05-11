import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Colors, XButton, XIconInput } from "../../../rsi/rsi-react-native";
import { Error } from "../../../rsi/rsi-react-native-components";

const BatchInfoInput = ({error, inputHandler, onDownload, navigation}) => {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Batch</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <XIconInput
            style={styles.input}
            inputStyle={styles.inputText}
            placeholder="Enter Batch No."
            rounded
            id="batchno"
            onInputChange={inputHandler}
          />
          {error && <Error text={error} />}
          <XButton
            style={styles.downloadButton}
            title="Start Download"
            onPress={onDownload}
          />
          <XButton
            style={styles.cancelButton}
            color={Colors.inactiveColor}
            title="Cancel"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
  },
  header: {
    height: 55,
    backgroundColor: Colors.primary,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    paddingLeft: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 250,
    marginBottom: 20,
  },
  inputText: {
    fontSize: 24,
    textAlign: "center",
  },
  downloadButton: {
    width: 250,
  },
  cancelButtonContainer: {
    alignItems: "center",
    paddingBottom: 10,
  },
  cancelButton: {
    width: 250,
  },
});

export default BatchInfoInput;
