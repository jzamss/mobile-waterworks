import React from "react";
import { View, StyleSheet, Modal } from "react-native";

const SearchScreen = (props) => {
  return (
    <Modal visible={props.show} >
      <View style={styles.screen}>
        <View style={styles.searchPanel}>
          <Text>All</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    opacity: 50,
    justifyContent: "flex-start",
  },
  searchPanel: {
    backgroundColor: "white",
    width: 100,
    height: 200,
  },
});

export default SearchScreen;
