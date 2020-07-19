import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import * as images from "../../../../assets/images";
import {
  Fonts,
  Colors,
  TouchableComponent,
} from "../../../rsi-react-native";

const Stubout = (props) => {
  const { onSelect, onSelectGeoTag } = props;
  const { code, description, barangay, recordcount, lng, lat } = props.data;

  const hasGeoTag = !!lng && !!lat;
  const geoTagImage = hasGeoTag ? images.geoTag : images.geoTagOutline;
  const acctText = recordcount <= 1 ? " account" : " accounts";

  return (
    <View style={styles.container}>
      <View style={styles.geoTagContainer}>
        <TouchableComponent onPress={() => onSelectGeoTag(props.data)} style={styles.touchable}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={geoTagImage} />
          </View>
        </TouchableComponent>
      </View>
      <View style={styles.infoContainer}>
        <TouchableComponent onPress={() => onSelect(props.data)}>
          <Text style={styles.title}>STUBOUT {code}</Text>
          <Text style={styles.info}>{description}</Text>
          <View style={styles.brgyContainer}>
            <Text style={styles.info}>{barangay}</Text>
            <Text style={{ ...styles.info, ...styles.count }}>
              {recordcount} {acctText}
            </Text>
          </View>
        </TouchableComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomColor: Colors.listItemBorder,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  geoTagContainer: {
    width: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  toucable: {
    flex: 1,
    width: 60,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 32,
    height: 32,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: Fonts.large,
  },
  info: {
    fontSize: Fonts.medium,
  },
  brgyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  count: {
    paddingHorizontal: 15,
  },
});

export default Stubout;
