import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Fonts, XButton } from "../../rsi/rsi-react-native";
import { Counter, ImagePicker } from "../../rsi/rsi-react-native-components";

import * as acctActions from "../../store/actions/account";

const MeterReadingScreen = (props) => {
  const readOnly = !!props.navigation.getParam("readOnly");

  const batch = useSelector((state) => state.batch.batch);
  const account = useSelector((state) => state.account.account);
  const [reading, setReading] = useState(account.reading);
  const [selectedImage, setSelectedImage] = useState(account.photourl);

  const { meterserialno, meterbrand, metersize, metercapacity } = account;
  const dispatch = useDispatch();

  const readingHandler = (newReading) => {
    setReading(newReading);
  };

  const imageTakenHandler = (image) => {
    setSelectedImage(image);
  };

  const saveReadingHandler = () => {
    dispatch(acctActions.saveReading(account, reading, selectedImage));
    props.navigation.navigate("Account");
  };

  let ReadingComponent;
  if (readOnly) {
    ReadingComponent = (
      <View style={styles.container}>
        <View style={styles.counterContainer}>
          <View style={styles.readingContainer}>
            <Text style={styles.reading}>{reading}</Text>
          </View>
        </View>
        <ImagePicker
          onImageTaken={imageTakenHandler}
          imageUrl={selectedImage}
          readOnly={true}
        />
      </View>
    );
  } else {
    ReadingComponent = (
      <View style={styles.container}>
        <Counter onRead={readingHandler} value={reading} max={metercapacity} />
        <ImagePicker
          onImageTaken={imageTakenHandler}
          imageUrl={selectedImage}
        />
        <View style={styles.actionContainer}>
          <XButton title="Save Reading" onPress={saveReadingHandler} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.info}>
        <Text style={styles.text}>Meter Serial No.: {meterserialno}</Text>
        <Text style={styles.text}>Brand: {meterbrand}</Text>
        <Text style={styles.text}>Size: {metersize}</Text>
        <Text style={styles.text}>Capacity: {metercapacity}</Text>
      </View>
      {ReadingComponent}
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
