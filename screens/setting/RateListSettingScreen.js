import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { XButton, Fonts } from "../../rsi/rsi-react-native";
import { Loading, SimpleListItem, Status } from "../../rsi/rsi-react-native-components";

import * as rateActions from "../../store/actions/rate";

const RateListSettingScreen = (props) => {
  const rates = useSelector((state) => state.rate.rates);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const loadRates = async () => {
    setIsLoading(true);
    await dispatch(rateActions.loadRates());
  };

  useEffect(() => {
    loadRates().then(() => {
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
      console.log(err);
    });
  }, []);

  const fetchRates = async () => {
    setError(null);
    setIsLoading(true);
    await dispatch(rateActions.fetchRates());
  };

  const getUpdatedRatesHandler = () => {
    fetchRates()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  const openRuleHandler = (item) => {
    props.navigation.navigate("Rate", { rate: item });
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
      <XButton title="Get Latest Updates" onPress={getUpdatedRatesHandler} />
    </View>
  );
};

RateListSettingScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Update Rates",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    alignItems: "center",
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
  error: {
    color: "red",
  },
});

export default RateListSettingScreen;
