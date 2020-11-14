import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import Login from "../../screens/Auth/Login";
import SignUp from "../../screens/Auth/SignUp";
import ForgotPassword from "../../screens/Auth/ForgotPassword";

const authNavigator = createStackNavigator();

const AuthNavigator = () => (
  <authNavigator.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
    initialRouteName="login"
  >
    <authNavigator.Screen component={Login} name="login" />
    <authNavigator.Screen component={SignUp} name="signup" />
    <authNavigator.Screen component={ForgotPassword} name="forgot" />
  </authNavigator.Navigator>
);

export default AuthNavigator;
