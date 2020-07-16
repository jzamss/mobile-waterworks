import React, { useState } from "react";
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

  const printTestPage = (device) => {
    let cpcl = "";
    // cpcl += "! 0 200 200 210 1\r\n";
    // cpcl += "; Print 2 labels\r\n";
    // cpcl += "CENTER\r\n";
    // cpcl += "TEXT 4 0 0 50 TEST PRINT\r\n";
    // cpcl += "COUNT 1\r\n";
    // cpcl += "TEXT 7 0 0 100 Barcode Value is 123456789\r\n";
    // cpcl += "COUNT -10\r\n";
    // cpcl += "BARCODE 128 1 1 50 0 130 123456789\r\n";
    // cpcl += "COUNT -10\r\n";
    // cpcl += "FORM\r\n";
    // cpcl += "PRINT\r\n";

    cpcl += "! 0 200 200 1350 1\r\n";
    cpcl += "CENTER\r\n";
    cpcl += "TEXT 0 5 200 10 BOHOL WATER\r\n";
    cpcl += "TEXT 0 5 200 50 UTILITIES INC.\r\n";
    cpcl += "TEXT 7 0 200 90 Tagbilaran City\r\n";
    cpcl += "TEXT 7 0 200 110 Tel. No. (999) 999-99999\r\n";
    cpcl += "TEXT 4 0 20 140 BILLING STATEMENT\r\n";
    cpcl += "TEXT 7 1 20 190 For the Month of May 2020\r\n";
    cpcl += "TEXT 7 1 20 210 4/23/2020 - 5/22/2020\r\n";
    cpcl += "LEFT\r\n";
    cpcl += "TEXT 4 0 20 270 =====================\r\n";
    cpcl += "TEXT 0 5 20 300 DELA CRUZ, JUAN M.\r\n";
    cpcl += "TEXT 0 3 20 350 MAIN ST., BARANGAY I\r\n";
    cpcl += "TEXT 4 0 20 370 =====================\r\n";
    cpcl += "TEXT 0 3 20 410 Account No.  : 99-99999\r\n";
    cpcl += "TEXT 0 3 20 440 Billing No.  : 99-99999\r\n";
    cpcl += "TEXT 0 3 20 470 Reference No.: 99-99999\r\n";
    cpcl += "TEXT 0 3 20 500 Consumer Type: RESIDENTIAL\r\n";
    cpcl += "TEXT 0 3 20 530 Sequence No. : 60\r\n";
    cpcl += "TEXT 4 0 20 550 -------------------------------------\r\n";
    cpcl += "TEXT 0 3 20 580 Pres. Reading                 1333\r\n";
    cpcl += "TEXT 0 3 20 600 Prev. Reading                 1316\r\n";
    cpcl += "TEXT 0 3 20 620 Consumption                     17\r\n";
    cpcl += "TEXT 4 0 20 640 ----------------------------------\r\n";
    cpcl += "TEXT 0 3 20 660 May 2020                    185.50\r\n";
    cpcl += "TEXT 0 3 20 680 Arrears: WB                 237.40\r\n";
    cpcl += "TEXT 0 3 20 700 Surcharges                    4.75\r\n";
    cpcl += "TEXT 4 0 20 720 ----------------------------------\r\n";
    cpcl += "TEXT 0 5 20 750 TOTAL DUE           427.65\r\n";
    cpcl += "TEXT 4 0 20 800 =====================\r\n";
    cpcl += "TEXT 0 3 20 840 Due Date      6/22/20\r\n";
    cpcl += "TEXT 0 5 20 860 Disconnection 6/22/20\r\n";
    cpcl += "TEXT 7 1 20 900 Please disregrad if payment\r\n";
    cpcl += "TEXT 7 1 20 940 has been made.\r\n";
    cpcl += "TEXT 0 3 20 990 Remarks   Normal Reading\r\n";
    cpcl += "TEXT 0 3 20 1010 Reading Date   6/22/20\r\n";
    cpcl += "TEXT 0 3 20 1030 Meter Reader: ART\r\n";
    cpcl += "TEXT 0 3 20 1040 Timestamp: 7:50:51 PM\r\n";
    cpcl += "TEXT 4 0 20 1060 =====================\r\n";
    cpcl += "TEXT 0 2 20 1080 Provider: Rameses Systems Inc.\r\n";
    cpcl += "TEXT 0 2 20 1100 Software: Waterworks\r\n";
    cpcl += "TEXT 0 2 20 1120 Address: RA-2F CCCI Bldg, Cebu City\r\n";
    cpcl += "TEXT 4 0 20 1140 =====================\r\n";
    cpcl += "TEXT 0 2 20 1160 This billing statement is not\r\n";
    cpcl += "TEXT 0 2 20 1180 valid for claiming input tax.\r\n";
    cpcl += "CENTER\r\n";
    cpcl += "TEXT 0 2 20 1220 This document shall be valid for five (5).\r\n";
    cpcl += "TEXT 0 2 20 1240 years from the date of the permit to use.\r\n";
    cpcl += "BARCODE 128 1 1 100 20 1270 123456789\r\n";
    cpcl += "TEXT 7 0 20 380 123456789\r\n";
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
      })
      .catch((err) => {
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
