import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  NativeModules,
  Platform,
  ActivityIndicator,
  Button,
  ScrollView,
} from "react-native";
import XButton from "../../rsi/ui/XButton";
import Colors from "../../rsi/constants/Colors";

import * as settings from "../../store/actions/settings"

const Devices = ({ devices, action, actionTitle }) => {
  return devices.map((device) => (
    <View key={device.name} style={styles.devices}>
      <View style={{ ...styles.device, ...styles.deviceName }}>
        <Text style={styles.text}>{device.name}</Text>
      </View>
      <View style={{ ...styles.device, ...styles.deviceAddress }}>
        <Text style={styles.text}>{device.address}</Text>
      </View>
      {action && (
        <View style={{ ...styles.device }}>
          <Button
            title={actionTitle}
            onPress={() => action(device)}
            color={Colors.accent2}
          />
        </View>
      )}
    </View>
  ));
};

const PrinterSetupScreen = () => {
  const [loading, setLoading] = useState(false);
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const [devices, setDevices] = useState([]);
  const [loadingDevices, setLoadingDevices] = useState(false);
  const [unpairedDevices, setUnpairedDevices] = useState([]);
  const [loadingUnpaired, setLoadingUnpaired] = useState(false);
  const dispatch = useDispatch();

  const printTestPage = (device) => {
    let cpcl = "";
    cpcl += "! 0 200 200 210 1\r\n";
    cpcl += "; Print 2 labels\r\n";
    cpcl += "CENTER\r\n";
    cpcl += "TEXT 4 0 0 50 TEST PRINT\r\n";
    cpcl += "COUNT 1\r\n";
    cpcl += "TEXT 7 0 0 100 Barcode Value is 123456789\r\n";
    cpcl += "COUNT -10\r\n";
    cpcl += "BARCODE 128 1 1 50 0 130 123456789\r\n";
    cpcl += "COUNT -10\r\n";
    cpcl += "FORM\r\n";
    cpcl += "PRINT\r\n";

    NativeModules.RNZebraBluetoothPrinter.print(device.address, cpcl)
      .then((res) => {
        console.log("TEST PRINT", res);
      })
      .catch((err) => {
        console.log("TEST PRINT ERROR", err)
      });
  };

  React.useEffect(() => {
    NativeModules.RNZebraBluetoothPrinter.isEnabledBluetooth().then((res) => {
      setIsBluetoothEnabled(true);
      viewPairedDevices();
    });
  }, [viewPairedDevices]);

  const enableBluetooth = () => {
    NativeModules.RNZebraBluetoothPrinter.enableBluetooth()
      .then((res) => {
        setIsBluetoothEnabled(true);
      })
      .catch((err) => {
        alert("Error enabling Bluetooth. Please try again.");
      });
  };

  const disableBluetooth = () => {
    NativeModules.RNZebraBluetoothPrinter.disableBluetooth()
      .then((res) => {
        setIsBluetoothEnabled(false);
      })
      .catch((err) => {
        alert("Error disabling Bluetooth. Please try again.");
      });
  };

  const viewPairedDevices = () => {
    setLoadingDevices(true);
    NativeModules.RNZebraBluetoothPrinter.pairedDevices()
      .then((res) => {
        setDevices(res);
        setLoadingDevices(false);
        dispatch(settings.setPrinter(res[0]));
      })
      .catch((err) => {
        console.log("ERROR", err);
        alert("Unable to load paired devices right now. Please try again.");
      });
  };

  const viewUnpairedDevices = () => {
    setLoadingUnpaired(true);
    NativeModules.RNZebraBluetoothPrinter.scanDevices()
      .then((res) => {
        let foundDevices;
        if (Platform.OS == "ios") {
          //filter array for printers [class:1664]
          foundDevices = JSON.parse(res.found);
        } else {
          const devices = JSON.parse(res);
          foundDevices = devices.found;
        }
        setUnpairedDevices(foundDevices);
        setLoadingUnpaired(false);
      })
      .catch((err) => {
        alert("Unable to load unpaired devices right now. Please try again.");
      });
  };

  const connectDevice = () => {
    NativeModules.RNZebraBluetoothPrinter.connectDevice(device.address)
      .then((res) => {
        alert("Device has been successfully connected.");
      })
      .catch((err) => {
        alert("Unable to connect to device. Please try again.");
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {loading && <ActivityIndicator />}
          {!isBluetoothEnabled && (
            <XButton title="Enable Bluetooth" onPress={enableBluetooth} />
          )}
          {isBluetoothEnabled && (
            <XButton title="Disable Bluetooth" onPress={disableBluetooth} />
          )}

          <XButton title="View Paired Devices" onPress={viewPairedDevices} />
          {loadingDevices && <ActivityIndicator />}
          <Devices
            devices={devices}
            actionTitle="Print"
            action={printTestPage}
          />
          <XButton
            title="View Unpaired Devices"
            onPress={viewUnpairedDevices}
          />
          {loadingUnpaired && <ActivityIndicator />}
          <Devices
            devices={unpairedDevices}
            actionTitle="connect"
            action={connectDevice}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    alignItems: "center",
  },
  devices: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  device: {
    borderWidth: 1,
    borderColor: "blue",
    padding: 10,
  },
  deviceName: {
    flex: 0.3,
  },
  deviceAddress: {
    flex: 0.3,
  },
  text: {
    fontSize: 20,
  },
});

export default PrinterSetupScreen;
