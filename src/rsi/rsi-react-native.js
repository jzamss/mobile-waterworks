import { Platform } from "react-native";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native-gesture-handler";

export { default as Colors } from "./constants/Colors";
export { default as Fonts } from "./constants/Fonts";
export { default as Icons } from "./constants/Icons";

export { default as XButton } from "./ui/XButton";
export { default as XHeaderButton } from "./ui/XHeaderButton";
export { default as XIconInput } from "./ui/XIconInput";
export { default as XInput } from "./ui/XInput";
export { default as XLabel } from "./ui/XLabel";
export { default as XLabelInput } from "./ui/XLabelInput";
export { default as XTabBarIcon } from "./ui/XTabBarIcon";

let TouchableComponent = TouchableOpacity;
if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

export { TouchableComponent };
