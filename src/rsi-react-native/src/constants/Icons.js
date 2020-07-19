
import {Platform} from "react-native";

const iconPrefix = Platform.OS === "android" ? "md" : 'ios';
export default {
    search: `${iconPrefix}-search`,
    menu: `${iconPrefix}-menu`,
}
