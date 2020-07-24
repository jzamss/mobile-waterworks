import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, ScrollView } from "react-native";
import { Colors, Button, MsgBox } from "../../rsi-react-native";
import * as reportManager from "../../rsi-react-native/lib/report-manager";

import AccountStatus from "./components/AccountStatus";
import AccountDetail from "./components/AccountDetail";
import Batch from "./components/Batch";

import * as acctActions from "../../store/actions/account";

const AccountScreen = (props) => {
  const dispatch = useDispatch();

  const batch = useSelector((state) => state.batch.batch);
  const account = useSelector((state) => state.account.account);
  const printer = useSelector((state) => state.setting.printer);
  const [processing, setProcessing] = useState(false);

  const { seqno, lat, lng, reading } = account;
  const acctState = account.state;
  const hasGeoTag = lat !== null && lng != null;
  const hasReading = reading > 0;

  const readMeterHandler = () => {
    props.navigation.navigate("Meter");
  };

  const submitReading = () => {
    const submit = async () => {
      await dispatch(acctActions.submitReading(account, batch));
    };
    setProcessing(true);
    submit()
      .then(() => setProcessing(false))
      .catch((err) => setProcessing(false));
  };

  const submitReadingHandler = () => {
    let msg = "Account bill will now be submitted for printing.";
    msg += "Any changes or corrections will no longer be allowed.\n\n";
    msg += "Continue?";
    MsgBox("Water Billing", msg, submitReading);
  };

  const viewReadingHandler = () => {
    props.navigation.navigate("Meter", { readOnly: true });
  };

  const printHandler = async () => {
    MsgBox("Waterworks", "Print statement of account?", () => {
      const report = reportManager.getReport("tagbilaran", printer);
      report.print(account).then(() => {
        dispatch(acctActions.billPrinted(account));
        alert("Printing successfully completed.");
      }).catch(err => {
        alert("An error occured during print. Please try again.");
      });
    });
  };

  const nextAccountHandler = async () => {
    await dispatch(acctActions.loadNextAccount(account))
  }

  const openGeoTagHandler = () => {
    let location;
    if (!!account.lng && !!account.lat) {
      location = { lng: account.lng, lat: account.lat };
    }
    props.navigation.navigate("GeoTag", {
      tagInfo: "ACCOUNT",
      acctname: account.acctname,
      address: account.address,
      data: account,
      location: location,
      readOnly: acctState >= 1,
      saveLocation: saveAccountLocation,
    });
  };

  const saveAccountLocation = async (account, selectedLocation) => {
    await dispatch(acctActions.saveLocation(account, selectedLocation));
  };

  const isForSubmission = account.state === 0;
  const isSubmitted = account.state >= 1;
  const readEditTitle = isForSubmission && hasReading ? "Edit" : "Read";

  return (
    <View style={styles.screen}>
      <View style={styles.accountContainer}>
        <ScrollView>
          <View style={styles.accountInfo}>
            <AccountStatus
              {...{ seqno, hasGeoTag, hasReading, hideReadStatus: true }}
              onPressGeoTag={openGeoTagHandler}
            />
            <AccountDetail data={account} complete />
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.readEditContainer}>
          {isForSubmission && (
            <Button
              style={styles.button}
              title={readEditTitle}
              onPress={readMeterHandler}
            />
          )}
          {isForSubmission && hasReading && (
            <Button
              style={styles.button}
              title="Submit"
              onPress={submitReadingHandler}
              processing={processing}
            />
          )}
        </View>
        <View style={styles.viewPrintContainer}>
          {isSubmitted && (
            <React.Fragment>
              <Button
                style={styles.button}
                title="Reading"
                onPress={viewReadingHandler}
                processing={processing}
              />
              <Button
                style={styles.button}
                title="Print"
                onPress={printHandler}
              />
              <Button
                style={styles.button}
                title="Next"
                onPress={nextAccountHandler}
              />
            </React.Fragment>
          )}
        </View>
      </View>
      <Batch style={styles.batch} data={batch} />
    </View>
  );
};

AccountScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Account Information",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
  },
  accountContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  readEditContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  viewPrintContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  accountInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 5,
  },
  batch: {
    height: 110,
    backgroundColor: Colors.infoBackground,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
  button: {
    width: 200,
  },
});

export default AccountScreen;
