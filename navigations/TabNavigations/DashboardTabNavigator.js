import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Dashboard from "../../screens/Dashboard";
import { useTheme } from "react-native-paper";

const tab = createMaterialTopTabNavigator();

const DashboardTabsNavigator = () => {
  const { colors } = useTheme();
  return (
    <tab.Navigator
      initialRouteName="home"
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: "black",
        indicatorStyle: { backgroundColor: colors.primary },
        labelStyle: { fontSize: 12 },
      }}
    >
      <tab.Screen name="all" component={Dashboard} />
      <tab.Screen name="Academic" component={Dashboard} />
      <tab.Screen name="NonAcademic" component={Dashboard} />
    </tab.Navigator>
  );
};

export default DashboardTabsNavigator;
