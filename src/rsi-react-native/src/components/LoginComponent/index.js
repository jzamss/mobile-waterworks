import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet } from "react-native";

import Container from "../../ui/Container";
import Button from "../../ui/Button";
import InputField from "../../ui/InputField";
import Separator from "../../ui/Separator";

class LoginComponent extends PureComponent {
  state = {
    username: "",
    password: "",
  };

  inputChangeHandler = (id, value) => {
    this.setState({ [id]: value });
  };

  render() {
    const { logo, onLogin, width } = this.props;
    const newWidth = width || 250;

    return (
      <Container style={styles.screen}>
        <Image style={styles.logo} source={logo} />
        <InputField
          placeholder="Username"
          id="username"
          onInputChange={this.inputChangeHandler}
          icon="person"
          rounded={true}
          returnKeyType="next"
          width={newWidth}
        />
        <InputField
          placeholder="Password"
          id="password"
          onInputChange={this.inputChangeHandler}
          icon="lock"
          secureTextEntry
          rounded={true}
          returnKeyType="go"
          width={newWidth}
        />
        <Separator height={20} />
        <Button
          title="Get Started"
          onPress={() =>
            onLogin({
              username: this.state.username,
              password: this.state.password,
            })
          }
          width={newWidth}
        />
      </Container>
    );
  }
}

LoginComponent.propTypes = {
  logo: PropTypes.number.isRequired,
  onLogin: PropTypes.func.isRequired,
  width: PropTypes.number,
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
  input: {
    width: 300,
  },
  button: {
    marginTop: 15,
    width: 300,
  },
});

export default LoginComponent;
