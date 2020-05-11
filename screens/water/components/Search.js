import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Menu } from "../../../rsi/rsi-react-native-components";

import SearchPanel from "./SearchPanel";
/*====================================
* Displays a search field and an optional
* menu bar.
* 
* props:
*   onSearch(searchFilter) - to execute search
*   clear - flag to clear the search input
*   [menu] - the menu items to display
*      handler: callback func 
*   
*  searchFilter = { searchText, menuItem }
======================================*/
const Search = ({ onSearch, clear, menu }) => {
  const [searchText, setSearchText] = useState();
  const [clearSearch, setClearSearch] = useState(false);
  const [menuItem, setMenuItem] = useState();

  const searchTextHandler = (text) => {
    setSearchText(text);
    setClearSearch(false);
  };

  const doSearch = () => {
    onSearch({ searchText, searchFilter: menuItem });
  };

  const menuHandler = (item) => {
    setMenuItem(item);
    setSearchText(null);
    setClearSearch(true);
    item.handler(item);
  };

  return (
    <View style={styles.menuContainer}>
      {menu && <Menu menu={menu} onSelect={menuHandler} />}
      <SearchPanel
        onSearch={doSearch}
        onInputChange={searchTextHandler}
        clear={clearSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  menu: {
    height: 50,
  },
});

export default Search;
