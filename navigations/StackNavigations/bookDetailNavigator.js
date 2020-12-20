import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";

import { Button, useTheme } from "react-native-paper";
import Icons from "react-native-vector-icons/FontAwesome";
import PreviewCartItem from "../../screens/Orders/PreviewCartItem";

const bookDetail = createStackNavigator();

const bookDetailNavigator = () => {
  const { colors } = useTheme();

  return (
    <bookDetail.Navigator
      //   initialRouteName="MyOrders"
      screenOptions={({ navigation }) => ({
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false
      })}
    >
      <bookDetail.Screen
        component={PreviewCartItem}
        name="bookDetail"
        
      />
    </bookDetail.Navigator>
  );
};

export default bookDetailNavigator;
