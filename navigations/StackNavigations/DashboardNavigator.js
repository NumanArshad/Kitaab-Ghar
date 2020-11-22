import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
// import Dashboard from "../../screens/Dashboard";
// import About from "../../screens/About";
// import SplashScreen from "../../screens/SplashScreen";
import { Button, useTheme, Searchbar } from "react-native-paper";
import Icons from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { StatusBar } from "react-native";

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
        headerRight: (props) => (
          <Feather
            {...props}
            name="search"
            color={colors.surface}
            size={20}
            onPress={() =>
              navigation.navigate("searchHome", {
                screen: "all",
                params: { searchable: true },
              })
            }
            style={{ marginRight: 10 }}
          />
        ),
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      })}
    >
      <home.Screen component={DashboardTabsNavigator} name="home" />
      <home.Screen
        component={DashboardTabsNavigator}
        name="searchHome"
        options={{
          header: (props) => (
            <Searchbar
              placeholder="Search by name, author "
              style={{ marginTop: StatusBar.currentHeight }}
              //  onChangeText={onChangeSearch}
              //  value={searchQuery}
            />
          ),
          // headerStyle:{marginTop:60}
        }}
        initialParams={{ searchable: true }}
      />
    </home.Navigator>
  );
};

export default DashboardNavigator;
