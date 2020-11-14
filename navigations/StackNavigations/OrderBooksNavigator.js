import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";

import { Button, useTheme } from "react-native-paper";
import Icons from "react-native-vector-icons/FontAwesome";
import CreateEditOrderCart from "../../screens/Orders/CreateEditOrderCart";
import Orders from "../../screens/Orders/Orders";
const order = createStackNavigator();

const OrderBooksNavigator = () => {
  const { colors } = useTheme();

  return (
    <order.Navigator
       initialRouteName="MyCart"
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
      <order.Screen
        component={CreateEditOrderCart}
        name="MyCart"
        options={{ headerTitle: "Order Cart"}}
      />
      <order.Screen component={Orders} name="MyOrders" />
    </order.Navigator>
  );
};

export default OrderBooksNavigator;
