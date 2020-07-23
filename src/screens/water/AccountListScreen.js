import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors, Status, Loading } from "../../rsi-react-native";

import * as acctActions from "../../store/actions/account";

import Account from "./components/Account";
import Batch from "./components/Batch";
import FilterInfo from "./components/FilterInfo";
import Search from "./components/Search";

const AccountListScreen = (props) => {
  const batchId = props.navigation.getParam("batchId");
  const batch = useSelector((state) => state.batch.batch);
  const stubout = useSelector((state) => state.batch.stubout);
  
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({title: "ALL", searchText: null});
  const [menuItem, setMenuItem] = useState();

  const dispatch = useDispatch();

  const handleError = err => {
    setLoading(false);
    setError(err.toString());
  }

  const loadAccounts = () => {
    setLoading(true);
    acctActions.loadAccounts(batchId, filter).then(accounts => {
      setLoading(false);
      setAccounts(accounts)
    }).catch(handleError);
  }

  useEffect(() => {
    loadAccounts();  
  }, [filter]);
  
  const refreshList = () => {
    setIsFetching(true);
    fetchData();
  }

  const menuHandler = (menuItem) => {
    setMenuItem(menuItem);
    const newFilter = {...filter, ...menuItem};
    setFilter(newFilter);
  }

  const handleStubout = (menuItem) => {
    props.navigation.navigate('Stubouts');
  }

  const menu = [
    { name: "all", title: "All", handler: (menuItem) => menuHandler(menuItem) },
    { name: "stubout", title: "By Stubout", handler: (menuItem) => handleStubout(menuItem) },
    { name: "nearest", title: "Nearest to Me", handler: (menuItem) => menuHandler(menuItem) },
    { name: "unread", title: "Unread", handler: (menuItem) => menuHandler(menuItem) },
    { name: "completed", title: "Completed", handler: (menuItem) => menuHandler(menuItem) },
    { name: "unmapped", title: "Unmapped", handler: (menuItem) => menuHandler(menuItem) },
    { name: "reload", title: "Reload List", handler: (menuItem) => menuHandler(menuItem) },
  ];

  const doSearch = (params) => {
    setFilter({...filter, ...params})
  }

  useEffect(() => {
    props.navigation.addListener("willFocus", loadAccounts);
  }, [])
  

  const openAccountHandler = (account) => {
    dispatch(acctActions.setSelectedAccount(account))
    props.navigation.navigate("Account");
  };

  let recordStatusComponent;
  if (loading) {
    recordStatusComponent = <Loading />;
  } 

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Search menu={menu} onSearch={doSearch} />
        <FilterInfo filter={filter}/>
      </View>
      {recordStatusComponent || (
        <View style={styles.listContainer}>
          <FlatList
            data={accounts}
            keyExtractor={(item) => item.objid}
            refreshing={loading}
            onRefresh={refreshList}
            ListEmptyComponent={<Status style={styles.status} text="No accounts found!" />}
            renderItem={(itemData) => (
              <Account
                data={itemData.item}
                onSelectAccount={openAccountHandler}
              />
            )}
          />
        </View>
      )}
      {batch && <Batch style={styles.batch} data={batch} />}
    </View>
  );
};

AccountListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Accounts",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
    margin: 5,
  },
  header: {
    marginHorizontal: 5,
  },
  listContainer: {
    flex: 1,
  },
  batch: {
    height: 110,
    backgroundColor: Colors.infoBackground,
    paddingHorizontal: 10,
  },
  status: {
    flex: 1,
  },
});

export default AccountListScreen;
