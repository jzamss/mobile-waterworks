import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icons from "../../constants/Icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const PowerButton = ({ device, enabled, size, color, onPowerOn, onPowerOff }) => {
  const statusColor = enabled ? "green" : "grey";
  const iconSize = size || 60;
  const deviceType = device || "Bluetooth"
  const pressHandler = enabled ? onPowerOff : onPowerOn;
  const status = enabled ? "ON" : "OFF";
  return (
    <TouchableOpacity onPress={pressHandler}>
      <View style={styles.container}>
        <Ionicons name={Icons.power} color={statusColor} size={iconSize}/>
        <Text>{deviceType} is {status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles ={
    container: {
        alignItems: "center"
    }
}

export default PowerButton;
