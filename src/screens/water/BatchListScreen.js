import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button } from "../../rsi-react-native"
import { Status, Loading } from "../../rsi-react-native-component"

import * as batchActions from "../../store/actions/batch";

import Batch from "./components/Batch";

const BatchListScreen = (props) => {
  const batches = useSelector((state) => state.batch.batches);

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [batchId, setBatchid] = useState();
  
  const dispatch = useDispatch();

  const loadBatches = async () => {
    await dispatch(batchActions.loadBatches());
  };

  const uploadBatch = async (batch) => {
    await dispatch(batchActions.uploadBatch(batch.objid));
  }

  useEffect(() => {
    setIsLoading(true);
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

  const uploadReading = (batch) => {
    setIsUploading(true);
    setBatchid(batch.objid);
    uploadBatch(batch).then(() => {
      setIsUploading(false);
      setBatchid(null);
    }).catch(err => {
      console.log("ERR", err)
      setError(err.toString());
      setIsUploading(false);
    })
  };

  return (
    <Container style={styles.screen}>
      <Status text="No batch found!" hide={isLoading || batches.length > 0} />
      <FlatList
        data={batches}
        keyExtractor={(item) => item.objid}
        renderItem={(itemData) => (
          <Batch
            data={itemData.item}
            openBatch={openBatchHandler}
            uploadReading={uploadReading}
            isUploading={isUploading}
          />
        )}
      />
      <Loading hide={!isLoading && !isUploading} />
      <Status text={`Uploading batch ${batchId}. Please wait...`} hide={!isUploading} />
      <View style={styles.buttonContainer}>
        {!isUploading && <Button title="Add Batch" onPress={addBatchHandler}/>}
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
