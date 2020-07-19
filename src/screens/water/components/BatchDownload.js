import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Colors, Fonts } from "../../../rsi-react-native";

const BatchDownload = ({ downloadedCount, count, batchNo }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Batch</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.downloadCaption}>Downloading</Text>
        <Text style={styles.downloadTitle}>{batchNo}</Text>
        <ActivityIndicator style={styles.indicator} size="small" />
        <Text style={styles.processing}>
          Processing {downloadedCount} of {count} records
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
  },
  header: {
    height: 55,
    backgroundColor: Colors.primary,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    paddingLeft: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  downloadCaption: {
    fontSize: Fonts.medium,
  },
  downloadTitle: {
    fontSize: Fonts.large,
    fontWeight: "bold",
  },
  indicator: {
    marginVertical: 50,
  },
  processing: {
      fontSize: Fonts.medium
  }
});

export default BatchDownload;
