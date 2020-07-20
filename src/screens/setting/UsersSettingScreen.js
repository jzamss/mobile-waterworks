import React, { useState, useEffect } from "react";
import { Button, View, StyleSheet, FlatList, Text } from "react-native";
import {
  MsgBox,
  Colors,
  Button as XButton,
  Separator,
  InputField,
} from "../../rsi-react-native";

import * as userActions from "../../store/actions/auth";

const User = ({ user, removeUser }) => {
  console.log("USER", user);
  return (
    <View style={styles.item}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{user.name || user.username}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{user.jobtitle || "n/a"}</Text>
      </View>
      <Button
        title="Remove"
        onPress={() => removeUser(user)}
        color={Colors.accent2}
      />
    </View>
  );
};

const Users = ({ users, removeUser, addUser }) => {
  return (
    <View style={styles.usersScreen}>
      <FlatList
        style={styles.list}
        keyExtractor={(item) => item.objid}
        data={users}
        removeUser={removeUser}
        renderItem={({ item }) => <User user={item} removeUser={removeUser} />}
      />
      <View style={styles.buttonContainer}>
        <XButton title="Add User" onPress={addUser} />
      </View>
    </View>
  );
};

const NewUser = ({ addNewUser, cancelAddUser }) => {
  const [user, setUser] = useState({});

  const inputChangeHandler = (id, value) => {
    const newUser = { ...user };
    newUser[id] = value;
    setUser(newUser);
  };

  return (
    <View style={{ width: 300 }}>
      <Text style={styles.title}>New User Information</Text>
      <InputField
        placeholder="Username"
        id="username"
        onInputChange={inputChangeHandler}
        rounded={true}
        returnKeyType="next"
        containerStyle={{ paddingLeft: 0 }}
      />
      <InputField
        placeholder="Password"
        id="password"
        onInputChange={inputChangeHandler}
        secureTextEntry
        rounded={true}
        returnKeyType="go"
        containerStyle={{ paddingLeft: 0 }}
      />
      <Separator height={20} />
      <XButton title="Add" onPress={() => addNewUser(user)} />
      <XButton
        title="Cancel"
        color={Colors.secondaryButtonColor}
        onPress={cancelAddUser}
      />
    </View>
  );
};

const UsersSettingScreen = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("list");

  const showError = (err) => {
    MsgBox("Waterworks", err.toString(), () => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    userActions
      .loadUsers()
      .then((users) => {
        setUsers(users);
        setLoading(false);
      })
      .catch(showError);
  }, []);

  const addUser = () => {
    setMode("adduser");
  };

  const addNewUser = (user) => {
    setLoading(true);
    userActions
      .addNewUser(user)
      .then((users) => {
        setUsers(users);
        setLoading(false);
        setMode("list");
      })
      .catch(showError);
  };

  const cancelAddUser = () => {
    setMode("list");
  }

  const removeUser = (user) => {
    MsgBox("Waterworks", "Remove selected user?", () =>
      userActions
        .removeUser(user)
        .then((users) => setUsers(users))
        .catch(showError)
    );
  };

  let component;
  if (mode === "list") {
    component = (
      <Users users={users} removeUser={removeUser} addUser={addUser} />
    );
  } else {
    component = <NewUser addNewUser={addNewUser} cancelAddUser={cancelAddUser}/>;
  }

  return <View style={styles.screen}>{component}</View>;
};

const styles = StyleSheet.create({
  screen: {
    marginTop: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    paddingLeft: 30,
  },
  usersScreen: {
    marginTop: 10,
    width: 600,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  textContainer: {
    flex: 1,
    paddingTop: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  text: {
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UsersSettingScreen;
