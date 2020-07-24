import React from "react";
import { View, StyleSheet, Text, Button, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icons from "../../constants/Icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../constants";

const PageButton = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Pagination = ({ moveToPage, rowsPerPage, recordCount, page }) => {
  const rows = rowsPerPage || 5;
  const startPage = page + 1;
  const lastPage = Math.floor(recordCount / rows) + (recordCount % rows && 1);

  return (
    <View style={styles.container}>
      <PageButton title="<<" onPress={() => moveToPage("first")} />
      <PageButton title="<" onPress={() => moveToPage("previous")} />
      <View style={styles.infoContainer}>
        <Text style={styles.pageInfo}>
          Page {startPage} / {lastPage}
        </Text>
      </View>
      <PageButton title=">" onPress={() => moveToPage("next")} />
      <PageButton title=">>" onPress={() => moveToPage("last")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    height: 35
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold"
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderColor,
    height: 35
  },
  pageInfo: {
    fontSize: 16,
  }
});
export default Pagination;
