import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors, TouchableComponent } from "../../../rsi-react-native";
import * as images from "../../../../assets/images";

const AccountStatus = ({
  seqno,
  hasGeoTag,
  hasReading,
  hideReadStatus,
  onPressGeoTag,
}) => {
  const geoTagImage = hasGeoTag ? images.geoTag : images.geoTagOutline;
  const readImage = hasReading ? images.readStatus : images.readStatusOutline;

  return (
    <TouchableComponent onPress={onPressGeoTag}>
      <View style={styles.container}>
        <Text style={styles.title}>{seqno}</Text>
        <View style={styles.markerContainer}>
          <Image style={styles.imageGeoTag} source={geoTagImage} />
          {!hideReadStatus && (
            <Image style={styles.imageRead} source={readImage} />
          )}
        </View>
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 100,
    justifyContent: "center",
    borderColor: "red",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.listItemBorder,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  markerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  imageGeoTag: {
    width: 24,
    height: 24,
  },
  imageRead: {
    width: 32,
    height: 24,
  },
});

export default AccountStatus;
