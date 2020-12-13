import React from "react";
import { View } from "react-native";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import DashboardNavigator from "../StackNavigations/DashboardNavigator";
import CustomDrawerContent from "../../components/DrawerComponent";
import OrderBooksNavigator from "../StackNavigations/OrderBooksNavigator";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "react-native-paper";
import WishList from "../../screens/WishList";
import WishListNavigator from "../StackNavigations/WishListNavigator";

const drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const {
    colors: { primary },
  } = useTheme();
  return (
    <drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      openByDefault={false}
      drawerContentOptions={{
        activeTintColor: primary,
        
        // itemStyle: { marginVertical: 30 },
      }}
      
    >
      <drawer.Screen
        component={DashboardNavigator}
        name="home"
        options={{
          drawerIcon: (props) => <FontAwesome5 name="home" {...props} />,
          title: "Home",
        }}
      />
      <drawer.Screen
        component={WishListNavigator}
        name="wishlist"
        options={{
          drawerIcon: (props) => <MaterialIcons name="favorite" {...props} />,
          title: "Wish List",
        }}
      />
      <drawer.Screen
        component={OrderBooksNavigator}
        name="MyCart"
        options={{
          drawerIcon: (props) => (
            <FontAwesome5 name="shopping-cart" {...props} />
          ),
        }}
        // onPress={()=>alert("owfh4")}
      />
      <drawer.Screen
        component={OrderBooksNavigator}
        name="MyOrders"
        onItemPress={({route, focused}) => {
          if (focused) {
          alert("is focused")
          } else {
            alert("not")
          }
        }}
        options={{
          drawerIcon: (props) => <Octicons name="checklist" {...props} />,
        }}
      />
    </drawer.Navigator>
  );
};

export default DrawerNavigator;
