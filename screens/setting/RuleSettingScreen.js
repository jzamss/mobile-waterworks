import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { XLabel } from "../../rsi/rsi-react-native";

const RuleSettingScreen = (props) => {
  const rule = props.navigation.getParam("rule");

  return (
    <ScrollView>
      <View style={styles.screen}>
        <XLabel style={styles.label} caption="Rule Name" value={rule.rulename} />
        <XLabel style={styles.label} caption="Salience" value={rule.salience} />
        <XLabel style={styles.box} caption="Script" value={rule.script} />
      </View>
    </ScrollView>
  );
};

RuleSettingScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Rule Information"
  }
}

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

export default RuleSettingScreen;
