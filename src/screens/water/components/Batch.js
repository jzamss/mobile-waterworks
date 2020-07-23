import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Label, Button, Colors } from "../../../rsi-react-native";

const Batch = (props) => {
  const { data, openBatch, uploadReading, isUploading } = props;
  return (
    <View style={{...styles.container, ...props.style}}>
      <TouchableOpacity onPress={() => {
        if (openBatch) openBatch(data)
      }}>
        <View style={styles.itemContainer}>
          <Label
            style={styles.item}
            labelStyle={styles.label}
            caption="Batch No.:"
            value={data.objid}
          />
          <View style={styles.rowItem}>
            <Label
              style={styles.item}
              labelStyle={styles.label}
              caption="Area:"
              value={data.areacode}
            />
            <Label
              style={styles.item}
              labelStyle={styles.label}
              caption="Sub-Area:"
              value={data.subareacode}
            />
          </View>
          <Label
            style={styles.item}
            labelStyle={styles.label}
            caption="Reader:"
            value={data.readername}
          />
          <View style={styles.rowItem2}>
            <Label
              style={styles.item}
              labelStyle={styles.label}
              textStyle={{ paddingRight: 20 }}
              caption="No. of entries:"
              value={data.recordcount}
            />
            <Label
              style={styles.item}
              labelStyle={styles.label}
              caption="Unread:"
              value={data.recordcount - data.readcount}
            />
          </View>
        </View>
      </TouchableOpacity>
      {data.readcount > 0 && !isUploading ? (
        <View style={styles.buttonContainer}>
          <Button
            color={Colors.accent2}
            title="Upload Reading"
            onPress={() => uploadReading(data)}
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
