import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Fonts, Button, Counter, ImagePicker } from "../../rsi-react-native";

import * as acctActions from "../../store/actions/account";

const MeterReadingScreen = (props) => {
  const readOnly = !!props.navigation.getParam("readOnly");

  const batch = useSelector((state) => state.batch.batch);
  const account = useSelector((state) => state.account.account);
  const [reading, setReading] = useState(account.reading);
  const [selectedImage, setSelectedImage] = useState(account.photourl);
  const [processing, setProcessing] = useState(false);

  const {
    meterserialno,
    meterbrand,
    metersize,
    metercapacity,
    prevreading,
  } = account;
  const dispatch = useDispatch();

  const readingHandler = (newReading) => {
    setReading(newReading);
  };

  const imageTakenHandler = (image) => {
    setSelectedImage(image);
  };

  const saveReading = async () => {
    await dispatch(
      acctActions.saveReading(batch, account, reading, selectedImage)
    );
  }

  const saveReadingHandler = async () => {
    setProcessing(true);
    saveReading().then(() => {
      setProcessing(false);
      props.navigation.navigate("Account");
    }).catch((err) => {
      setProcessing(false);
    })
  };

  const value = readOnly || reading > 0 ? reading : prevreading

  return (
    <View style={styles.screen}>
      <View style={styles.info}>
        <Text style={styles.text}>Meter Serial No.: {meterserialno}</Text>
        <Text style={styles.text}>Brand: {meterbrand}</Text>
        <Text style={styles.text}>Size: {metersize}</Text>
        <Text style={styles.text}>Capacity: {metercapacity}</Text>
        <Text style={styles.text}>Previous Reading: {prevreading}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.counterContainer}>
          <Counter
            onRead={readingHandler}
            value={value}
            max={metercapacity}
            readOnly={readOnly}
          />
        </View>
        <ImagePicker
          onImageTaken={imageTakenHandler}
          imageUrl={selectedImage}
          readOnly={readOnly}
        />
      </View>
      {!readOnly && (
        <View style={styles.actionContainer}>
          <Button processing={processing} title="Save Reading" onPress={saveReadingHandler} />
        </View>
      )}
    </View>
  );
};

MeterReadingScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Meter Reading",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: "flex-start",
  },
  info: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.listItemBorder,
    marginBottom: 10,
    paddingBottom: 10,
  },
  text: {
    fontSize: Fonts.medium,
  },
  container: {
    flex: 1,
  },
  counterContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  actionContainer: {
    alignItems: "center",
  },
  readingContainer: {
    width: 200,
    borderWidth: 2,
    borderColor: Colors.counterBorder,
    padding: 5,
    marginVertical: 10,
  },
  reading: {
    fontSize: Fonts.extraLarge,
    textAlign: "center",
  },
});

export default MeterReadingScreen;
