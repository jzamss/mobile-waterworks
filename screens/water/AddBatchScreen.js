import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Modal } from "react-native";

import { Colors } from "../../rsi/rsi-react-native";

import BatchInfoInput from "./components/BatchInfoInput";
import BatchDownload from "./components/BatchDownload";

import * as batchActions from "../../store/actions/batch";

const AddBatchScreen = (props) => {
  const user = useSelector((state) => state.auth.user);
  const connection = useSelector(state => state.setting.connection)
  const batches = useSelector(state => state.batch.batches);

  const [batchno, setBatchno] = useState();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadedCount, setDownloadedCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState();
  const [recordCount, setRecordCount] = useState(0);
  const dispatch = useDispatch();

  const batchInputHandler = (id, value) => {
    setBatchno(value);
  };

  const incrementDownloadCount = () => {
    setDownloadedCount((prevDownoadedCount) => prevDownoadedCount + 1);
  };

  const initRecordCount = (recordCount = 0) => {
    setRecordCount(recordCount);
  };

  const downloadBatch = async () => {
    setIsDownloading(true);
    setIsCompleted(false);
    setError(null);
    await batchActions.downloadBatch(batchno, user, initRecordCount, incrementDownloadCount, connection)
    await dispatch(batchActions.loadBatches());
  };

  const downloadHandler = () => {
    if (!batchno) {
      setError("Batch No. must be specified.");
      return;
    }
    
    if (batches.find(item => item.objid.toLowerCase() === batchno.toLowerCase())) {
      setError("Batch No. is already downloaded.");
      return;
    }

    downloadBatch()
      .then(() => {
        props.navigation.goBack();
      })
      .catch((err) => {
        setIsDownloading(false);
        setIsCompleted(false);
        setError(err.toString());
      });
  };

  return (
    <Modal animationType="slide">
      {isDownloading ? (
        <BatchDownload
          batchNo={batchno}
          downloadedCount={downloadedCount}
          count={recordCount}
        />
      ) : (
        <BatchInfoInput
          error={error}
          inputHandler={batchInputHandler}
          onDownload={downloadHandler}
          navigation={props.navigation}
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
  },
  header: {
    height: 55,
    backgroundColor: Colors.primary,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    paddingLeft: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 300,
    // marginBottom: 20,
  },
  inputText: {
    // fontSize: 24,
    // textAlign: "center",
  },
  downloadButton: {
    width: 250,
  },
  cancelButtonContainer: {
    alignItems: "center",
    paddingBottom: 10,
  },
  cancelButton: {
    width: 250,
  },
});

export default AddBatchScreen;
