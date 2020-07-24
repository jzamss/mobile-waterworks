
import {Platform} from "react-native";

const iconPrefix = Platform.OS === "android" ? "md" : 'ios';
export default {
    search: `${iconPrefix}-search`,
    menu: `${iconPrefix}-menu`,
    firstPage: `${iconPrefix}-play-skip-back-circle-outline`,
    previousPage: `${iconPrefix}-play-back-circle-outline`,
    nextPage: `${iconPrefix}-play-forward-circle-outline`,
    lastPage: `${iconPrefix}-play-skip-forward-circle-outline`,
}
