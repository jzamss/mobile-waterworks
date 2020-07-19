import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {LATITUDE, LONGITUDE} from "../../../../Constants"

const MapPreview = (props) => {
  const { location } = props;
  const scrollable = !!!props.scrollable;

  let mapRegion;
  let markerCoordinate;

  const lat = location ? location.lat : LATITUDE;
  const lng = location ? location.lng : LONGITUDE;

  mapRegion = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  markerCoordinate = {
    latitude: lat,
    longitude: lng,
  };

  return (
    <View style={{ ...styles.container, ...props.style }}>
      <MapView style={styles.map} region={mapRegion} scrollEnabled={scrollable}>
        {location && <Marker coordinate={markerCoordinate} />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
