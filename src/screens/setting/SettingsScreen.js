import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SimpleListItem } from "../../rsi-react-native";

const SettingsScreen = (props) => {
  const settings = [
    { routeName: "Connection", title: "Connection", },
    { routeName: "Computation", title: "Computation Rate Rules", ruleType: "consumption" },
    { routeName: "Billing", title: "Billing Rules", ruleType: "billing" },
    { routeName: "Printer", title: "Printer Setup", },
  ];

  const openItemHandler = (item) => {
    props.navigation.navigate(item.routeName, {ruleType: item.ruleType, title: item.title});
  };

  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(item,idx) => item.routeName}
        data={settings}
        renderItem={(itemData) => (
          <SimpleListItem
            title={itemData.item.title}
            data={itemData.item}
            onPress={openItemHandler}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SettingsScreen;
