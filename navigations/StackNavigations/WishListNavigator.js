import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";

import { Button, useTheme } from "react-native-paper";
import Icons from "react-native-vector-icons/FontAwesome";
import BooksCart from "../../screens/Orders/BooksCart";
import Orders from "../../screens/Orders/Orders";
import PreviewCartItem from "../../screens/Orders/PreviewCartItem";
import WishList from "../../screens/WishList";
const wishList = createStackNavigator();

const WishListNavigator = () => {
  const { colors } = useTheme();

  return (
    <wishList.Navigator
  //   initialRouteName="MyOrders"
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

        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      })}
    >
      <wishList.Screen
        component={WishList}
        name="wish-lists"
        options={{ headerTitle: "My WishList" }}
      />
    </wishList.Navigator>
  );
};

export default WishListNavigator;
