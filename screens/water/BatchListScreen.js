import React, { useState, useCallback, useEffect } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { XButton } from "../../rsi/rsi-react-native";
import { Status, Loading } from "../../rsi/rsi-react-native-components";

import * as batchActions from "../../store/actions/batch";

import Batch from "./components/Batch";

const BatchListScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const batches = useSelector((state) => state.batch.batches);

  const dispatch = useDispatch();

  const loadBatches = async () => {
    setIsLoading(true);
    await dispatch(batchActions.loadBatches());
  };

  useEffect(() => {
    loadBatches()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  const addBatchHandler = () => {
    props.navigation.navigate("AddBatch");
  };

  const openBatchHandler = (batch) => {
    dispatch(batchActions.setSelectedBatch(batch));
    props.navigation.navigate("Accounts", { batchId: batch.objid });
  };

  const uploadReadingHandler = () => {
    console.log("uploadReadingHandler");
  };

  let StatusComponent;
  if (isLoading) {
    StatusComponent = <Loading />;
  } else if (!isLoading && batches.length === 0) {
    StatusComponent = <Status style={styles.status} text="No batch found!" />;
  }

  return (
    <View style={styles.screen}>
      {StatusComponent || (
        <FlatList
          data={batches}
          keyExtractor={(item) => item.objid}
          renderItem={(itemData) => (
            <Batch
              data={itemData.item}
              openBatch={openBatchHandler}
              uploadReading={uploadReadingHandler}
            />
          )}
        />
      )}
      <View style={styles.buttonContainer}>
        <XButton title="Add Batch" onPress={addBatchHandler} />
      </View>
    </View>
  );
};

BatchListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Select Batch",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  status: {
    flex: 1,
  },
});

export default BatchListScreen;
