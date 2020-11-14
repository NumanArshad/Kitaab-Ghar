import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import AuthNavigator from "./AuthNavigator";
import DrawerNavigator from "../DrawerNavigation/DrawerNavigator";
import SellBooksNavigator from "./SellBooksNavigator";

const rootNavigator = createStackNavigator();

const RootNavigator = () => (
  <rootNavigator.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <rootNavigator.Screen component={AuthNavigator} name="login" />
    <rootNavigator.Screen component={DrawerNavigator} name="home" />
    <rootNavigator.Screen component={SellBooksNavigator} name="sellbooks" />
  </rootNavigator.Navigator>
);

export default RootNavigator;
