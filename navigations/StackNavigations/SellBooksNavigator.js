import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";

import { Button, useTheme } from "react-native-paper";
import Icons from "react-native-vector-icons/FontAwesome";
import CreateEditBook from "../../screens/Books/CreateEditBook";
import BookSecondaryInfo from "../../screens/Books/BookSecondaryInfo";
const books = createStackNavigator();

const SellBooksNavigator = () => {
  const { colors } = useTheme();

  return (
    <books.Navigator
      initialRouteName="sellbooks"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTintColor: colors.surface,
        headerStyle: {
          backgroundColor: colors.primary,
        },
      }}
    >
      <books.Screen
        component={CreateEditBook}
        name="sellbooks"
        options={{ headerTitle: "Add Book" }}
      />
      <books.Screen
        component={BookSecondaryInfo}
        options={{ headerTitle: "Add Secondary Info" }}
        name="secondaryinfo"
      />
    </books.Navigator>
  );
};

export default SellBooksNavigator;
