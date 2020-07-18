import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  View,
} from "react-native";

import { LoginComponent } from "../rsi-react-native-component";
import { XButton, XLabelInput, Colors, Fonts } from "../rsi-react-native";
import * as authActions from "../store/actions/auth";

const Modes = {
  initial: "initial",
  register: "register",
  recover: "recover",
  login: "login",
};

const RegisterOption = (props) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image style={styles.logo} source={require("../../assets/icon.png")} />
      <Text style={styles.title}>Terminal Registration</Text>
      <View style={{ marginTop: 10 }}>
        <XButton
          buttonText={styles.buttonText}
          title="Register New Terminal"
          onPress={props.onRegister}
        />
        <XButton
          color={Colors.secondaryButtonColor}
          buttonText={styles.buttonText}
          title="Recover Terminal"
          onPress={props.onRecover}
        />
      </View>
    </View>
  );
};

const RegisterTerminal = (props) => {
  const [entity, setEntity] = useState({});

  const inputChangeHandler = (id, value) => {
    const updatedEntity = { ...entity, [id]: value };
    setEntity(updatedEntity);
  };

  return (
    <View style={styles.registerTerminal}>
      <Image style={styles.logo} source={require("../../assets/icon.png")} />
      <Text style={styles.title}>Terminal Information</Text>

      <XLabelInput
        id="terminalid"
        label="Terminal Key"
        initialValue={entity.terminalid}
        onInputChange={inputChangeHandler}
      />
      <XLabelInput
        id="registeredby"
        label="Registered By"
        initialValue={entity.registeredby}
        onInputChange={inputChangeHandler}
      />
      <View style={styles.buttonContainer}>
        <XButton
          style={styles.button}
          title="Cancel"
          onPress={props.onCancel}
        />
        <XButton
          style={styles.button}
          title="Submit"
          onPress={() => props.onSubmit(entity)}
        />
      </View>
    </View>
  );
};

const LoginScreen = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const [isLogging, setIsLogging] = useState(false);
  const [mode, setMode] = useState(Modes.initial);

  const dispatch = useDispatch();

  const onLoginHandler = async (user) => {
    setIsLogging(true);
    try {
      await dispatch(authActions.login(user));
    } catch (err) {
      setIsLogging(false);
      Alert.alert("Authentication Error!", err, [{ text: "Okay" }]);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      props.navigation.navigate("Water");
    }
  }, [isAuthenticated]);

  const registerNewTerminal = () => {
    setMode(Modes.register);
  };

  const recoverTerminal = () => {
    authActions
      .recoverTerminal()
      .then(() => setMode(Modes.login))
      .catch((err) => alert(err.toString()));
  };

  const registerTerminal = (terminal) => {
    authActions
      .registerTerminal(terminal)
      .then(() => setMode(Modes.login))
      .catch((err) => alert(err.toString()));
  };

  let component;
  if (mode === Modes.initial) {
    component = (
      <RegisterOption
        onRegister={registerNewTerminal}
        onRecover={recoverTerminal}
      />
    );
  } else if (mode === Modes.register) {
    component = (
      <RegisterTerminal
        onCancel={() => setMode(Modes.initial)}
        onSubmit={registerTerminal}
      />
    );
  } else {
    component = (
      <LoginComponent
        logo={require("../../assets/icon.png")}
        onLogin={onLoginHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      {component}
      {isLogging && <ActivityIndicator size="small" />}
    </View>
  );
};

LoginScreen.navigationOptions = (navData) => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 192,
    height: 192,
    marginVertical: 30,
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
    fontSize: 24,
    color: Colors.primary,
    fontWeight: "bold",
  },
  registerTerminal: {
    width: 450,
  },
  buttonText: {
    fontSize: Fonts.medium,
  },
});

export default LoginScreen;
