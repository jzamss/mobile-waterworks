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

import {
  Button as XButton,
  Colors,
  Error,
  PowerButton,
  MsgBox,
} from "../../rsi-react-native";

import * as settings from "../../store/actions/settings";

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
  const [error, setError] = useState();
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
    
    // cpcl += "! 0 200 200 210 1\r\n";
    // cpcl += "CENTER 540\r\n";
    // cpcl += "TEXT 4 0 20 75 CCCC\r\n";
    // cpcl += "LEFT\r\n";
    // cpcl += "TEXT 4 0 20 75 LLLL\r\n";
    // cpcl += "RIGHT 540\r\n";
    // cpcl += "TEXT 4 0 20 75 RRRR\r\n";
    // cpcl += "FORM\r\n";
    // cpcl += "PRINT\r\n";

    MsgBox("Waterworks", "Print a test page?", () => {
      NativeModules.RNZebraBluetoothPrinter.print(device.address, cpcl)
        .then((res) => {
          console.log("TEST PRINT", res);
        })
        .catch((err) => {
          console.log("TEST PRINT ERROR", err);
          setError(err.toString());
        });
    });
  };

  React.useEffect(() => {
    NativeModules.RNZebraBluetoothPrinter.isEnabledBluetooth().then(
      (enabled) => {
        setIsBluetoothEnabled(enabled);
      }
    );
  }, []);

  React.useEffect(() => {
    if (isBluetoothEnabled) {
      viewPairedDevices();
    }
  }, [isBluetoothEnabled]);

  const enableBluetooth = () => {
    MsgBox("Waterworks", "Turn on Bluetooth?", () => {
      setLoading(true);
      setError(null);
      NativeModules.RNZebraBluetoothPrinter.enableBluetooth()
        .then((res) => {
          setIsBluetoothEnabled(true);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          alert("Error enabling Bluetooth. Please try again.");
        });
    });
  };

  const disableBluetooth = () => {
    MsgBox("Waterworks", "Turn off Bluetooth?", () => {
      setError(null);
      NativeModules.RNZebraBluetoothPrinter.disableBluetooth()
        .then((res) => {
          setIsBluetoothEnabled(false);
        })
        .catch((err) => {
          alert("Error disabling Bluetooth. Please try again.");
        });
    });
  };

  const viewPairedDevices = () => {
    setLoadingDevices(true);
    setError(null);
    NativeModules.RNZebraBluetoothPrinter.pairedDevices()
      .then((res) => {
        setDevices(res);
        setLoadingDevices(false);
        dispatch(settings.setPrinter(res[0]));
      })
      .catch((err) => {
        setLoadingDevices(false);
        console.log("ERROR", err);
        alert("Unable to load paired devices right now. Please try again.");
      });
  };

  const viewUnpairedDevices = () => {
    setLoadingUnpaired(true);
    setError(null);
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
    setError(null);
    MsgBox("Waterworks", "Connect to device?", () => {
      NativeModules.RNZebraBluetoothPrinter.connectDevice(device.address)
        .then((res) => {
          alert("Device has been successfully connected.");
        })
        .catch((err) => {
          alert("Unable to connect to device. Please try again.");
        });
    })
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.powerContainer}>
          <PowerButton
            enabled={isBluetoothEnabled}
            onPowerOn={enableBluetooth}
            onPowerOff={disableBluetooth}
          />
          {loading && <ActivityIndicator />}
        </View>
        {isBluetoothEnabled && (
          <React.Fragment>
            <View style={styles.devicesContainer}>
              {loadingDevices && <ActivityIndicator />}
              <Text style={styles.text}>Paired Devices</Text>
              <Devices
                devices={devices}
                actionTitle="Print"
                action={printTestPage}
              />
              {error && <Error text={error} />}
            </View>
            <View style={styles.devicesContainer}>
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
          </React.Fragment>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  powerContainer: {
    marginTop: 30,
    paddingBottom: 30,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  devicesContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  devices: {
    flexDirection: "row",
    justifyContent: "center",
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
  },
});

export default PrinterSetupScreen;
