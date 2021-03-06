import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import AuthNavigator from "./AuthNavigator";
import DrawerNavigator from "../DrawerNavigation/DrawerNavigator";
import SellBooksNavigator from "./SellBooksNavigator";
import OrderBooksNavigator from "./OrderBooksNavigator";
import bookDetailNavigator from "./bookDetailNavigator";

const rootNavigator = createStackNavigator();

const RootNavigator = () => (
  <rootNavigator.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
    initialRouteName="home"
  >
    <rootNavigator.Screen component={DrawerNavigator} name="home" />
    <rootNavigator.Screen component={SellBooksNavigator} name="sellbooks" />
     <rootNavigator.Screen component={bookDetailNavigator} name="bookDetail" />
  </rootNavigator.Navigator>
);

export default RootNavigator;
