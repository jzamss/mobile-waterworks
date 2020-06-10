import React from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet } from "react-native";
import {
  Container,
  Button,
  Separator,
} from "../../rsi-react-native";

const LogoutComponent = ({ logo, onLogout }) => {
  return (
    <Container style={styles.screen}>
      <Image style={styles.logo} source={logo} />
      <Separator height={20} />
      <Button title="Logout" onPress={onLogout} />
    </Container>
  );
};

LogoutComponent.propTypes = {
  logo: PropTypes.number.isRequired,
  onLogout: PropTypes.func.isRequired,
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
  
});

export default LogoutComponent;
