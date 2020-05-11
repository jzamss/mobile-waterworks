import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../rsi/rsi-react-native";
import { Status, Loading } from "../../rsi/rsi-react-native-components";

import * as acctActions from "../../store/actions/account";
import * as batchActions from "../../store/actions/batch";

import Account from "./components/Account";
import Batch from "./components/Batch";
import FilterInfo from "./components/FilterInfo";
import Search from "./components/Search";
import { fetchUpdateAsync } from "expo/build/Updates/Updates";

const AccountListScreen = (props) => {
  const batchId = props.navigation.getParam("batchId");
  const batch = useSelector((state) => state.batch.batch);
  const stubout = useSelector((state) => state.batch.stubout);
  const accounts = useSelector((state) => state.account.accounts);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [filterInfo, setFilterInfo] = useState("ALL");
  const [menuItem, setMenuItem] = useState();

  const dispatch = useDispatch();

  const doLoadAccounts = async () => {
    setIsLoading(true);
    const stuboutId = stubout && stubout.objid;
    await dispatch(acctActions.loadAccounts(batchId, stuboutId));
  };

  const loadAccounts = () => {
    doLoadAccounts().then(() => {
      setIsLoading(false);
      setIsFetching(false);
      if (stubout) {
        setFilterInfo("BY STUBOUT: " + stubout.code);
      }
    });
  }

  useEffect(() => {
    loadAccounts();
  }, [stubout]);


  const fetchData = () => {
    loadAccounts();
  }

  const refreshList = () => {
    setIsFetching(true);
    fetchData();
  }

  const search = async (searchText, searchFilter) => {
    const searchParams = { ...searchFilter };
    searchParams.filters = {
      meterserialno: searchText || "",
      acctname: searchText || "",
    };
    setIsLoading(true);
    await dispatch(acctActions.searchAccounts(searchParams));
  };

  const doSearch = ({searchText, searchFilter}) => {
    const filterTitle = searchFilter ? searchFilter.title.toUpperCase() : null;
    setFilterInfo(filterTitle)
    search(searchText, searchFilter).then(() => {
      setIsLoading(false);
    });
  };

  const menuHandler = (menuItem) => {
    setMenuItem(menuItem);
    dispatch(batchActions.setSelectedStubout(null));
    doSearch({searchText: null, searchFilter: menuItem});
  }

  const uploadHandler = () => {
    //TODO:
    console.log("uploadHandler()");
  };

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
    { name: "upload", title: "Upload Readings", handler: (menuItem) => uploadHandler() },
  ];

  const openAccountHandler = (account) => {
    dispatch(acctActions.setSelectedAccount(account));
    props.navigation.navigate("Account");
  };

  let recordStatusComponent;
  if (isLoading) {
    recordStatusComponent = <Loading />;
  } 

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Search menu={menu} onSearch={doSearch} />
        <FilterInfo info={filterInfo}/>
      </View>
      {recordStatusComponent || (
        <View style={styles.listContainer}>
          <FlatList
            data={accounts}
            keyExtractor={(item) => item.objid}
            refreshing={isFetching}
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
