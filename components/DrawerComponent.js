import React, { useEffect, useLayoutEffect } from "react";
import { Text, Image, ImageBackground, View, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import img from "../assets/app_icon.png"; //asset:/name.extension
import {
  Drawer,
  Divider,
  Avatar,
  ToggleButton,
  Button,
  useTheme,
} from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CommonActions } from "@react-navigation/native";
import { getCurrentUser, logout } from "../redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";

const CustomDrawerContent = (props) => {
  const { colors } = useTheme();

  const { email } = getCurrentUser();

  const {auth_role} = useSelector(state => state.auth)

  useEffect(() => {
   
  }, []);

  useLayoutEffect(() => {
    if (props.state.index === 3) {
      props.navigation.navigate("MyOrders", {
        screen: "MyOrders",
      });
    }
  }, [props.state.index]);

  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flex: 0.25, marginTop: 30, width: "100%", height: "100%" }}
      >
        <ImageBackground
          source={{ uri: "https://reactjs.org/logo-og.png" }}
          style={{
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Avatar.Image
              source={{
                uri:
                  "data:image/jpeg;base64,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",
              }}
              size={50}
            />
            <View style={styles.languageToggleContainer}>
              <View
                style={[
                  styles.languageViewStyle,
                  true
                    ? styles.activeLanguageView
                    : styles.inActiveLanguageView,
                ]}
              >
                <Text
                  style={
                    true
                      ? styles.activeLanguageText
                      : styles.inActiveLanguageText
                  }
                >
                  Eng
                </Text>
              </View>
              <View
                style={[
                  styles.languageViewStyle,
                  true
                    ? styles.inActiveLanguageView
                    : styles.activeLanguageView,
                ]}
              >
                <Text
                  style={
                    true
                      ? styles.inActiveLanguageText
                      : styles.inActiveLanguageText
                  }
                >
                  Urdu
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: "white" }}>Muhammad Numan Arshad {auth_role}</Text>
            <Text style={{ color: "white" }}>{email}</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={{ flex: 0.75, marginTop: -30 }}>
        <DrawerContentScrollView>
          <DrawerItemList {...props} />

          <DrawerItem
            label="Sell Books"
            icon={(props) => (
              <FontAwesome5 name="book" size="10px" {...props} />
            )}
            onPress={() => props.navigation.navigate("sellbooks")}
          />
          <Divider />
          <DrawerItem
            label="Settings"
            onPress={() => alert("eheh")}
            icon={(props) => (
              <AntDesign name="setting" size="10px" {...props} />
            )}
          />
          <DrawerItem
            label="Logout"
            onPress={() => logout()}
            icon={(props) => (
              <MaterialCommunityIcons name="logout" size="10px" {...props} />
            )}
          />
        </DrawerContentScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  languageToggleContainer: {
    borderWidth: 1,
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    backgroundColor: "white",
  },
  activeLanguageView: {
    backgroundColor: "#680f87",
  },
  activeLanguageText: {
    color: "white",
  },
  inActiveLanguageView: {
    backgroundColor: "white",
  },
  inActiveLanguageText: {
    color: "#680f87",
  },
  languageViewStyle: {
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
});

export default CustomDrawerContent;
