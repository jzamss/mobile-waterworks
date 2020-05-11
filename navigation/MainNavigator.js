import { createAppContainer, createSwitchNavigator } from "react-navigation";

import StartupScreen from "../screens/StartupScreen";
import AuthNavigator from "./AuthNavigator";
import WaterNavigator from "./WaterNavigator";

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Login: AuthNavigator,
  Water: WaterNavigator,
});

export default createAppContainer(MainNavigator);
