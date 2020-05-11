import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Icons,
  Colors,
  XInput,
  Fonts,
} from "../../../rsi/rsi-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const SearchPanel = ({ onSearch, onInputChange, clear}) => {
  const [searchText, setSearchText] = useState();

  const searchTextHandler = (id, text) => {
    setSearchText(text);
    onInputChange(text);
  };

  return (
    <View style={styles.container}>
      <XInput
        style={styles.inputContainer}
        inputStyle={styles.input}
        placeholder="Search Account"
        id="searchText"
        onInputChange={searchTextHandler}
        returnKeyType="search"
        onSubmitEditing={onSearch}
        clear={clear}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onSearch} activeOpacity={0.50}>
          <View>
            <Ionicons style={styles.searchIcon} name={Icons.search} size={25} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderColor: Colors.searchBorder,
    borderWidth: 1,
    padding: 2,
    height: 40,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    width: "100%",
    fontSize: Fonts.medium,
    paddingHorizontal: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    width: 25,
  },
});

export default SearchPanel;
