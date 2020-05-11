import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { XLabel } from "../../rsi/rsi-react-native";

const RateSettingScreen = (props) => {
  const rate = props.navigation.getParam("rate");

  return (
    <ScrollView>
      <View style={styles.screen}>
        <XLabel style={styles.label} caption="Rule Name" value={rate.rulename} />
        <XLabel style={styles.label} caption="Parameters" value={rate.params.join(", ")} />
        <XLabel style={styles.box} caption="Conditions" value={rate.condition} />
        <XLabel style={styles.box} caption="Actions" value={rate.action} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  label: {
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
  },
  box: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
  }
});

export default RateSettingScreen;
