import {Platform} from "react-native";

const iconPrefix = Platform.OS === "android" ? "md" : 'ios';

export default {
  fonts: {
    default: 16,
    small: 14,
    medium: 18,
    large: 24,
    extraLarge: 32,
  },
  colors: {
    primary: "#c2185b",
    accent: "#ffc107",
  },
  button: {
      color: '#2296F3',
      width: 1,
  },
  text: {
      color: '#000',
      borderColor: '#888',
      borderWidth: 1,
  },
  layout: {
      padding: 6,
      margin: 5,
  },
  icons: {
    search: `${iconPrefix}-search`,
    menu: `${iconPrefix}-menu`,
  }
};
