import React, { useRef } from "react";
import { View, Text, StyleSheet, processColor } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MeterialMenu, {
  MenuItem,
  MenuDivider,
} from "react-native-material-menu";

import { Colors, Fonts, Icons } from "../../rsi/rsi-react-native";

const Menu = ({ menu = [], onSelect, style, iconSize }) => {
  const menuRef = useRef();

  const size = iconSize || 32;

  const showMenu = () => {
    menuRef.current.show();
  };

  const hideMenu = (menuItem) => {
    menuRef.current.hide();
    onSelect(menuItem);
  };

  return (
    <View style={{ ...styles.container, ...style }}>
      <MeterialMenu
        style={styles.menu}
        ref={menuRef}
        button={<Ionicons name={Icons.menu} size={size} onPress={showMenu} />}
      >
        {menu.map((item) => (
          <MenuItem
            key={item.name}
            style={styles.menuItem}
            textStyle={styles.textStyle}
            underlayColor={Colors.accent}
            onPress={() => hideMenu(item)}
          >
            {item.title}
          </MenuItem>
        ))}
      </MeterialMenu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.searchBorder,
  },
  menu: {},
  menuItem: {},
  textStyle: {
    fontSize: Fonts.medium,
  },
});

export default Menu;
