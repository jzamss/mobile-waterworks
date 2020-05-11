import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";

import { XButton, XIconInput } from "../rsi/rsi-react-native";
import * as authActions from "../store/actions/auth";

const LoginScreen = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const [user, setUser] = useState({});
  const [isLogging, setIsLogging] = useState(false);
  const dispatch = useDispatch();

  const inputChangeHandler = (id, value) => {
    setUser({ ...user, [id]: value });
  };

  const onLoginHandler = async () => {
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

  return (
    <View style={styles.screen}>
      <Image style={styles.waterLogo} source={require("../assets/icon.png")} />
      <XIconInput
        style={styles.input}
        placeholder="Username"
        id="username"
        onInputChange={inputChangeHandler}
        icon="person"
        rounded={true}
        returnKeyType="next"
      />
      <XIconInput
        style={styles.input}
        placeholder="Password"
        id="password"
        onInputChange={inputChangeHandler}
        icon="lock"
        secureTextEntry
        rounded={true}
        returnKeyType="go"
      />
      <View style={styles.button}>
      <XButton title="Get Started" onPress={onLoginHandler} />
      </View>
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
  waterLogo: {
    width: 192,
    height: 192,
    marginVertical: 30,
  },
  input: {
    width: "60%",
  },
  button: {
    marginTop: 15,
    width: "60%"
  }
});

export default LoginScreen;
