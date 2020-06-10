import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, FlatList, StyleSheet, Text, Modal } from "react-native";
import Stubout from "./Stubout";

import * as batchActions from "../../../store/actions/batch";

const StuboutListScreen = (props) => {
  const stubouts = useSelector((state) => state.batch.stubouts);
  const dispatch = useDispatch();

  const selectItemHandler =  (item) => {
    dispatch(batchActions.setSelectedStubout(item));
    props.navigation.goBack();
  };

  const selectGeoTagHandler = (stubout) => {
      let location;
      if (!!stubout.lat && !!stubout.lng) {
        location = {lng: stubout.lng, lat: stubout.lat };
      }
    props.navigation.navigate("GeoTag", {
      tagInfo: "STUBOUT",
      acctname: stubout.code,
      address: stubout.description,
      data: stubout,
      location: location,
      saveLocation: saveStuboutLocation,
    });
  };

  const saveStuboutLocation = async (stubout, selectedLocation) => {
    await dispatch(batchActions.saveStuboutLocation(stubout, selectedLocation));
  };

  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(item) => item.objid}
        data={stubouts}
        renderItem={(itemData) => (
          <Stubout
            data={itemData.item}
            onSelect={selectItemHandler}
            onSelectGeoTag={selectGeoTagHandler}
          />
        )}
      />
    </View>
  );
};

StuboutListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Select a Stubout",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 15,
  },
});

export default StuboutListScreen;
