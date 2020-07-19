import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import Colors from "../../constants/Colors";
import Button from "../../ui/Button";

import MapPreview from "../MapPreview";
import {LATITUDE, LONGITUDE} from "../../../../Constants";

const LocationPicker = (props) => {
  let initialLocation;
  if (!props.location) {
    initialLocation = {lat: LATITUDE, lng: LONGITUDE};
  }
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState(initialLocation);

  mapPickedLocation = props.navigation.getParam("pickedLocation");

  const { onLocationPicked } = props;
  const readOnly = !!props.readOnly;

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map.",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate("Map", { initialLocation: pickedLocation });
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={{ ...styles.mapPreview, ...props.mapStyle }}
        location={pickedLocation}
        onPress={pickOnMapHandler}
        readOnly={readOnly}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      {!readOnly && (
        <View style={styles.actions}>
          <Button
            style={styles.button}
            title="Get User Location"
            onPress={getLocationHandler}
          />
          <Button
            style={styles.button}
            title="Pick on Map"
            onPress={pickOnMapHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    flex: 1, 
  },
  actions: {
    alignItems: "center",
    width: "100%",
  },
  button: {
    width: 300,
  },
});

export default LocationPicker;
