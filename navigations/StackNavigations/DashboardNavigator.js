import React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
// import Dashboard from "../../screens/Dashboard";
// import About from "../../screens/About";
// import SplashScreen from "../../screens/SplashScreen";
import { Button, useTheme } from "react-native-paper";
import Icons from "react-native-vector-icons/FontAwesome";
import DashboardTabsNavigator from "../TabNavigations/DashboardTabNavigator";
const home = createStackNavigator();


const DashboardNavigator = () => {
  const { colors } = useTheme();

  return (
    <home.Navigator
      initialRouteName="home"
      screenOptions={({ navigation }) => ({
        headerLeft: (props) => (
          <Icons
            {...props}
            name="bars"
            color={colors.surface}
            size={20}
            onPress={() => navigation.toggleDrawer()}
            style={{ marginLeft: 10 }}
          />
        ),
        headerTintColor: colors.surface,
        headerStyle: {
          backgroundColor: colors.primary,
        },
      })}
    >
      <home.Screen component={DashboardTabsNavigator} name="home"
      
      />
      {/* <home.Screen component={SplashScreen} name="splash" /> */}
    </home.Navigator>
  );
};

export default DashboardNavigator;
