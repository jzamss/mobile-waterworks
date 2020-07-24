import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors, Status, Loading, Button, Pagination } from "../../rsi-react-native";

import * as acctActions from "../../store/actions/account";

import Account from "./components/Account";
import Batch from "./components/Batch";
import FilterInfo from "./components/FilterInfo";
import Search from "./components/Search";

const AccountListScreen = (props) => {
  const batchId = props.navigation.getParam("batchId");
  const batch = useSelector((state) => state.batch.batch);
  const stubout = useSelector((state) => state.batch.stubout);
  const accounts = useSelector((state) => state.account.accounts);
  const initialPage = useSelector((state) => state.account.page);

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    title: "ALL",
    searchText: null,
    stubout,
    rowsPerPage: 5,
  });
  const [menuItem, setMenuItem] = useState();
  const [page, setPage] = useState(initialPage);

  const dispatch = useDispatch();

  const handleError = (err) => {
    setLoading(false);
    setError(err.toString());
  };

  const loadAccounts = async () => {
    await dispatch(
      acctActions.loadAccounts({ batchId, filter, page})
    );
  };
  
  useEffect(() => {
    setLoading(true)
    loadAccounts().then(() => {
      setLoading(false);
    }).catch(handleError);
  }, [page, filter]);

  const refreshList = () => {
    setIsFetching(true);
    fetchData();
  };

  const menuHandler = (menuItem) => {
    setPage(0);
    setMenuItem(menuItem);
    const newFilter = { ...filter, ...menuItem, searchText: null };
    setFilter(newFilter);
  };

  const handleStubout = (menuItem) => {
    props.navigation.navigate("Stubouts");
  };


  const menu = [
    { name: "all", title: "All", handler: (menuItem) => menuHandler(menuItem) },
    { name: "stubout", title: "By Stubout", handler: (menuItem) => handleStubout(menuIte),},
    { name: "nearest", title: "Nearest to Me", handler: (menuItem) => menuHandler(menuItem), },
    { name: "unread", title: "Unread", handler: (menuItem) => menuHandler(menuItem), },
    { name: "completed", title: "Completed", handler: (menuItem) => menuHandler(menuItem),},
    { name: "unmapped", title: "Unmapped", handler: (menuItem) => menuHandler(menuItem), },
    { name: "reload", title: "Reload List", handler: (menuItem) => menuHandler(menuItem), },
  ];

  const doSearch = (params) => {
    setPage(0);
    setFilter({ ...filter, ...params });
  };

  const openAccountHandler = (account) => {
    dispatch(acctActions.setSelectedAccount(account));
    props.navigation.navigate("Account");
  };

  const moveToPage = (dir) => {
    let newPage;
    switch (dir) {
      case "first":
        newPage = 0;
        break;
      case "previous":
        if (page > 0) {
          newPage = page - 1;
        }
        break;
      case "next":
        if (page * filter.rowsPerPage < batch.recordcount) {
          newPage = page + 1;
        }
        break;
      case "last":
        newPage = Math.floor(batch.recordcount / filter.rowsPerPage);
        break;
    }
    setPage(newPage);
  };

  let recordStatusComponent;
  if (loading) {
    recordStatusComponent = <Loading />;
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Search menu={menu} onSearch={doSearch} />
        <FilterInfo filter={filter} />
      </View>
      {recordStatusComponent || (
        <View style={styles.listContainer}>
          <FlatList
            data={accounts}
            keyExtractor={(item) => item.objid}
            refreshing={loading}
            onRefresh={refreshList}
            ListEmptyComponent={
              <Status style={styles.status} text="No accounts found!" />
            }
            renderItem={(itemData) => (
              <Account
                data={itemData.item}
                onSelectAccount={openAccountHandler}
              />
            )}
          />
        </View>
      )}

      {batch && (
        <View>
          {batch && batch.recordcount > filter.rowsPerPage && (
            <Pagination moveToPage={moveToPage} 
              recordCount={batch.recordcount} 
              page={page} />
          )}
          <Batch style={styles.batch} data={batch} />
        </View>
      )}
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default AccountListScreen;
