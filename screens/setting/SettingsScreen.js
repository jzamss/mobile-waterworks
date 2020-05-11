import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SimpleListItem } from "../../rsi/rsi-react-native-components";

const SettingsScreen = (props) => {
  const settings = [
    { routeName: "Connection", title: "Connection" },
    { routeName: "Rates", title: "Update Rates" },
    { routeName: "Printer", title: "Printer Setup" },
  ];

  const openItemHandler = (item) => {
    props.navigation.navigate(item.routeName);
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
