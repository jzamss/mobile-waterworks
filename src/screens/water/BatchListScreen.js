import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button, Separator } from "../../rsi-react-native"
import { Status, Loading } from "../../rsi-react-native-component"

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

  return (
    <Container style={styles.screen}>
      <Loading hide={!isLoading} />
      <Status text="No batch found!" hide={isLoading || batches.length > 0} />
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
      <View style={styles.buttonContainer}>
        <Button title="Add Batch" onPress={addBatchHandler} />
      </View>
    </Container>
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
    marginVertical: 20,
  },
});

export default BatchListScreen;
