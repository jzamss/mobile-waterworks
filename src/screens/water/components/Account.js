import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors, TouchableComponent } from "../../../rsi-react-native";

import AccountDetail from "./AccountDetail";
import AccountStatus from "./AccountStatus";

const Account = (props) => {
  const { data } = props;
  const { seqno, lat, lng } = data;
  const hasGeoTag = lat !== null && lng != null;
  const hasReading = data.state > 0;

  return (
    <View style={styles.container}>
      <View style={styles.accountInfo}>
        <AccountStatus
          seqno={seqno}
          hasGeoTag={hasGeoTag}
          hasReading={hasReading}
        />
        <View style={{flex: 1}}>
          <TouchableComponent
            activeOpacity={0.4}
            onPress={() => props.onSelectAccount(data)}
          >
            <AccountDetail data={data} />
          </TouchableComponent>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.listItemBorder,
  },
  accountInfo: {
    flexDirection: "row",
  },
});

export default Account;
