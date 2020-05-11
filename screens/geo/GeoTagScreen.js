import React, { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Button,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import { Colors, XButton } from "../../rsi/rsi-react-native";
import { LocationPicker } from "../../rsi/rsi-react-native-components";

const GeoTagScreen = (props) => {
  const tagInfo = props.navigation.getParam("tagInfo");
  const acctname = props.navigation.getParam("acctname");
  const address = props.navigation.getParam("address");
  const initialLocation = props.navigation.getParam("location");
  const readOnly = !!props.navigation.getParam("readOnly");
  const data = props.navigation.getParam("data");
  const saveLocation = props.navigation.getParam("saveLocation");

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  const saveLocationHandler = () => {
    if (!selectedLocation || !selectedLocation.lat) {
      Alert.alert(
        "Geo Location!",
        "Get user location or pick a location on the map before saving.",
        [{ text: "Okay" }]
      );
      return;
    }

    saveLocation(data, selectedLocation).then(() => {
      props.navigation.goBack();
    });
  };

  return (
    <View style={styles.form}>
      <View style={styles.accountInfo}>
        <Text style={styles.label}>Tag: {tagInfo}</Text>
        <Text style={styles.label}>Name: {acctname}</Text>
        <Text style={styles.label}>Address: {address}</Text>
      </View>
      <LocationPicker
        navigation={props.navigation}
        onLocationPicked={locationPickedHandler}
        mapStyle={styles.map}
        location={selectedLocation}
        readOnly={readOnly}
      />
      {!readOnly && (
        <View style={styles.actions}>
          <XButton
            style={styles.button}
            title="Save"
            color={Colors.primary}
            onPress={saveLocationHandler}
          />
        </View>
      )}
    </View>
  );
};

GeoTagScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Geo Tag",
  };
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    margin: 20,
  },
  accountInfo: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
  },
  map: {
    height: 200,
  },
  actions: {
    alignItems: "center",
  },
  button: {
    width: 250,
  },
});

export default GeoTagScreen;
