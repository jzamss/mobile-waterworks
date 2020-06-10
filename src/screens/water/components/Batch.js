import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { XLabel, XButton, Colors } from "../../../rsi/rsi-react-native";

const Batch = (props) => {
  const { data, readingCount, openBatch, uploadReading } = props;
  return (
    <View style={{...styles.container, ...props.style}}>
      <TouchableOpacity onPress={() => openBatch(data)}>
        <View style={styles.itemContainer}>
          <XLabel
            style={styles.item}
            labelStyle={styles.label}
            caption="Batch No.:"
            value={data.objid}
          />
          <View style={styles.rowItem}>
            <XLabel
              style={styles.item}
              labelStyle={styles.label}
              caption="Area:"
              value={data.areacode}
            />
            <XLabel
              style={styles.item}
              labelStyle={styles.label}
              caption="Sub-Area:"
              value={data.subareacode}
            />
          </View>
          <XLabel
            style={styles.item}
            labelStyle={styles.label}
            caption="Reader:"
            value={data.readername}
          />
          <View style={styles.rowItem2}>
            <XLabel
              style={styles.item}
              labelStyle={styles.label}
              textStyle={{ paddingRight: 20 }}
              caption="No. of entries:"
              value={data.recordcount}
            />
            <XLabel
              style={styles.item}
              labelStyle={styles.label}
              caption="Unread:"
              value={data.recordcount - data.readcount}
            />
          </View>
        </View>
      </TouchableOpacity>
      {readingCount ? (
        <View style={styles.buttonContainer}>
          <XButton
            color={Colors.accent2}
            title="Upload Reading"
            onPress={uploadReading}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: Colors.listItemBorder,
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  itemContainer: {
    paddingTop: 10,
  },
  item: {
    flexDirection: "row",
    paddingVertical: 1,
  },
  label: {
    marginRight: 15,
  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowItem2: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Batch;
