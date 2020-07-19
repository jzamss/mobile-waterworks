import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Colors, Button, IconInput, Error } from "../../../rsi-react-native";

const BatchInfoInput = ({error, inputHandler, onDownload, navigation}) => {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Batch</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <IconInput
            style={styles.input}
            placeholder="Enter Batch No."
            rounded
            id="batchno"
            onInputChange={inputHandler}
          />
          {error && <Error text={error} />}
          <Button
            style={styles.downloadButton}
            title="Start Download"
            onPress={onDownload}
          />
          <Button
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
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
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
