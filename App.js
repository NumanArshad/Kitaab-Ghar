import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import RootNavigator from "./navigations/StackNavigations/RootNavigator";
import Toast from 'react-native-toast-message';

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

export default function App() {
  return (
    <>
    <PaperProvider theme={theme}>
   
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
</>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
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
