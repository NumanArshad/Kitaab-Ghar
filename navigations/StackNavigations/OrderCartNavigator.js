import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";

import { Button, useTheme } from "react-native-paper";
import Icons from "react-native-vector-icons/FontAwesome";
import BooksCart from "../../screens/Orders/BooksCart";

const orderCart = createStackNavigator();

const OrderCartNavigator = () => {
  const { colors } = useTheme();

  return (
    <orderCart.Navigator
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
      <orderCart.Screen
        component={BooksCart}
        name="MyCart"
        options={{ headerTitle: "My orderCart" }}
      />
    </orderCart.Navigator>
  );
};

export default OrderCartNavigator;
