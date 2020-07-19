import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Label } from "../../rsi-react-native";

const RuleSettingScreen = (props) => {
  const rule = props.navigation.getParam("rule");

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Label style={styles.label} caption="Rule Name" value={rule.rulename} />
        <Label style={styles.label} caption="Salience" value={rule.salience} />
        <Label style={styles.box} caption="Script" value={rule.script} />
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
