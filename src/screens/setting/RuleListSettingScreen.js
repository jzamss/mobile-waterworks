import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, FlatList, StyleSheet, Text } from "react-native";
import {
  Button,
  Fonts,
  Loading,
  SimpleListItem,
  Status,
} from "../../rsi-react-native";

import { getRates, fetchRates } from "../../api/rate";

const RuleListSettingScreen = (props) => {
  const ruleType = props.navigation.getParam("ruleType");
  const connection = useSelector((state) => state.setting.connection);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [rates, setRates] = useState([]);

  const loadRates = async () => {
    setIsLoading(true);
    const rates = await getRates({ ruleType });
    setRates(rates);
  };

  useEffect(() => {
    loadRates()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [ruleType]);

  const getUpdatedRates = async () => {
    setError(null);
    setIsLoading(true);
    const rates = await fetchRates({ ruleType, connection });
    setRates(rates);
  };

  const getUpdatedRatesHandler = () => {
    getUpdatedRates()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.toString());
        setIsLoading(false);
      });
  };

  const openRuleHandler = (item) => {
    props.navigation.navigate("Rule", { rule: item });
  };

  let StatusComponent;
  if (error) {
    StatusComponent = (
      <Status
        style={styles.status}
        text="Failed to load updated rates."
        error={error}
      />
    );
  } else if (isLoading) {
    StatusComponent = <Loading />;
  } else if (!isLoading && rates.length === 0) {
    StatusComponent = (
      <Status style={styles.status}>
        <Text style={styles.text}>No rates found.</Text>
        <Text style={styles.text}>Try getting latest updates.</Text>
      </Status>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.listContainer}>
        {StatusComponent || (
          <FlatList
            data={rates}
            keyExtractor={(item) => item.rulename}
            renderItem={(itemData) => (
              <SimpleListItem
                title={itemData.item.rulename}
                data={itemData.item}
                onPress={openRuleHandler}
              />
            )}
          />
        )}
      </View>
      <View style={{ alignItems: "center" }}>
        <Button
          style={styles.button}
          title="Get Latest Updates"
          onPress={getUpdatedRatesHandler}
        />
      </View>
    </View>
  );
};

RuleListSettingScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam("title");
  return {
    headerTitle: title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
  },
  listContainer: {
    flex: 1,
  },
  status: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: Fonts.medium,
  },
  button: {
    width: 350,
  },
  error: {
    color: "red",
  },
});

export default RuleListSettingScreen;
