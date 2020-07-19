import React, { useState } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState(props.imageUrl);
  const readOnly = !!props.readOnly;

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      // allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  let ImageComponent;
  if (pickedImage) {
    ImageComponent = (
      <Image style={styles.image} source={{ uri: pickedImage }} />
    );
  } else {
    ImageComponent = <Icon name="md-camera" size={48} color={Colors.camera} />;
  }

  return (
    <TouchableOpacity onPress={takeImageHandler} activeOpacity={0.80} disabled={readOnly}>
      <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
          {ImageComponent}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginVertical: 15,
  },
  imagePreview: {
    width: "100%",
    height: 300,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImgPicker;
