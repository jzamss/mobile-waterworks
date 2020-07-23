import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

import { Colors, Fonts, Error } from "../../rsi-react-native";
import * as batchActions from "../../store/actions/batch";

const DownloadBatchScreen = (props) => {
  const user = useSelector((state) => state.auth.user);

  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState();
  const [status, setStatus] = useState({
    batchid: "",
    recordcount: 0,
    downloadedcount: 0,
    count: 0,
  });

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
  };

  useEffect(() => {
    setDownloading(true);
    batchActions
      .downloadBatches({user, updateStatus})
      .then(() => {
        setDownloading(false);
        props.navigation.state.params.refreshList();
        props.navigation.goBack();
      })
      .catch((err) => {
        setDownloading(false);
        setError(err.toString());
      });
  }, []);

  return (
    <View style={styles.screen}>
      {downloading ? (
        <View style={styles.container}>
          <Text style={styles.downloadCaption}>Downloading</Text>
          <Text style={styles.downloadTitle}>{status.batchid}</Text>
          <ActivityIndicator style={styles.indicator} size="small" />
          <Text style={styles.processing}>
            Processing {status.downloadedcount} of {status.recordcount} records
          </Text>
        </View>
      ) : (
        <Error text={error} />
      )}
    </View>
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
  downloadCaption: {
    fontSize: Fonts.medium,
  },
  downloadTitle: {
    fontSize: Fonts.large,
    fontWeight: "bold",
  },
  indicator: {
    marginVertical: 50,
  },
  processing: {
    fontSize: Fonts.medium,
  },
});

export default DownloadBatchScreen;
