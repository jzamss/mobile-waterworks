import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Alert,
  ActivityIndicator,
  View
} from "react-native";

import { LoginComponent } from "../rsi-react-native-component";
import * as authActions from "../store/actions/auth";

const LoginScreen = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const [isLogging, setIsLogging] = useState(false);

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

  return (
    <View style={styles.screen}>
      <LoginComponent 
        logo={require("../../assets/icon.png")} 
        onLogin={onLoginHandler} />
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
});

export default LoginScreen;
