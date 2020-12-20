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
const order = createStackNavigator();

const OrderBooksNavigator = () => {
  const { colors } = useTheme();

  return (
    <order.Navigator
      initialRouteName="MyOrders"
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
      <order.Screen component={Orders} name="MyOrders" />
    </order.Navigator>
  );
};

export default OrderBooksNavigator;
