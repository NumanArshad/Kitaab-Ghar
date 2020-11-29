import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import RootNavigator from "./navigations/StackNavigations/RootNavigator";
import { authObserver, getCurrentUser } from "./redux/auth/auth.actions";
import AuthNavigator from "./navigations/StackNavigations/AuthNavigator";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";

const theme = {
  ...DefaultTheme,
  //roundness: 40,
  colors: {
    ...DefaultTheme.colors,
    primary: "#680f87",
    secondary: "#E57373",
    accent: "#900C3F",
  },
};

const RootIndex = () => {
  const { is_auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log("state", is_auth);

  useEffect(() => {
    dispatch(authObserver());

  }, [dispatch]);

  return (
    <NavigationContainer>
      {is_auth ? <RootNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <RootIndex />
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
