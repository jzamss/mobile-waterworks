import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  LabelInput,
  Label,
  Colors,
  Fonts,
} from "../../rsi-react-native";

import * as settingActions from "../../store/actions/settings";

const ConnectionSettingScreen = (props) => {
  const dispatch = useDispatch();

  const initialConnection = useSelector((state) => state.setting.connection);
  const [connection, setConnection] = useState(initialConnection);

  const inputChangeHandler = (id, value) => {
    const updatedConnection = { ...connection, [id]: value };
    setConnection(updatedConnection);
  };

  const cancelHandler = () => {
    props.navigation.goBack();
  };

  const validateConnection = () => {
    if (!connection.adminhost) {
      return [false, "Please enter a valid admin host."];
    }
    if (!connection.admincluster) {
      return [false, "Please enter a valid admin cluster."];
    }
    if (!connection.admincontext) {
      return [false, "Please enter a valid admin context."];
    }
    
    if (!connection.waterworkshost) {
      return [false, "Please enter a valid waterworks host."];
    }
    if (!connection.waterworkscluster) {
      return [false, "Please enter a valid waterworks cluster."];
    }
    if (!connection.waterworkscontext) {
      return [false, "Please enter a valid waterworks context."];
    }
    
    return [true, ""];
  };

  const saveHandler = () => {
    const [valid, error] = validateConnection();

    if (!valid) {
      Alert.alert("Invalid data!", error, [{ text: "Okay" }]);
      retrurn;
    }

    try {
      dispatch(settingActions.updateConnection(connection));
      props.navigation.goBack();
    } catch (err) {
      Alert.alert("Save Error!", "An error occurred when saving connection.", [
        { text: "Okay" },
      ]);
    }
  };

  return (
    <View style={styles.screen}>
      <Label caption="Admin Server Settings" labelStyle={styles.title} />
      <LabelInput
        id="adminhost"
        label="Host"
        initialValue={connection.adminhost}
        onInputChange={inputChangeHandler}
        style={styles.inputContainer}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
      />
      <LabelInput
        id="admincluster"
        label="Cluster"
        initialValue={connection.admincluster}
        onInputChange={inputChangeHandler}
        style={styles.inputContainer}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
      />
      <LabelInput
        id="admincontext"
        label="Context"
        initialValue={connection.admincontext}
        onInputChange={inputChangeHandler}
        style={styles.inputContainer}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
      />

      <Label
        caption="Waterworks Server Settings"
        labelStyle={styles.title}
        style={{ marginTop: 30 }}
      />
      <LabelInput
        id="waterworkshost"
        label="Host"
        initialValue={connection.waterworkshost}
        onInputChange={inputChangeHandler}
        style={styles.inputContainer}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
      />
      <LabelInput
        id="waterworkscluster"
        label="Cluster"
        initialValue={connection.waterworkscluster}
        onInputChange={inputChangeHandler}
        style={styles.inputContainer}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
      />
      <LabelInput
        id="waterworkscontext"
        label="Context"
        initialValue={connection.waterworkscontext}
        onInputChange={inputChangeHandler}
        style={styles.inputContainer}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Save" onPress={saveHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 20,
    width: "100%",
  },
  button: {
    width: 200,
  },
  title: {
    fontSize: Fonts.large,
    color: Colors.primary,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelStyle: {
    flex: 1,
  },
  inputStyle: {
    flex: 5,
  },
});

export default ConnectionSettingScreen;
