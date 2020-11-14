import React, { useEffect, useState } from "react";
import { View, Text, Image, Alert, BackHandler } from "react-native";
import { TextInput, Headline, Button, useTheme } from "react-native-paper";
import app_icon from "../../assets/app_icon.png";
import styles from "./styles";
import InputField from "../../components/InputField";

export default function Login({ navigation }) {
  const backPressHandler = () => {
    Alert.alert("Exit from Kitaab Ghar!", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backPressHandler
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: "30%",
        alignItems: "center",

        backgroundColor: "white",
      }}
    >
      <Headline>Login</Headline>
      <Image source={app_icon} style={{ width: 120, height: 120 }} />
      <View style={styles.inputContainer}>
        <InputField
          extendStyles={[styles.inputField, styles.borderRadius]}
          placeholder="Email"
          underlineColor="transparent"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="password"
          underlineColor="transparent"
          style={[styles.inputField, styles.borderRadius]}
        />
      </View>
      <Button
        mode="contained"
        style={[styles.submitButton, styles.borderRadius]}
        onPress={() => navigation.navigate("home")}
      >
        Login
      </Button>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
          marginTop: 10,
        }}
      >
        <Text onPress={() => navigation.navigate("forgot")}>
          Forgot Password
        </Text>
        <Text onPress={() => navigation.navigate("signup")}>
          New User? SignUp
        </Text>
      </View>

      <View style={styles.socialLoginContainer}>
        <Text>or Signin with</Text>

        <View style={styles.socialButtonContainer}>
          <Button mode="outlined" icon="facebook">
            FaceBook
          </Button>
          <Button
            mode="contained"
            icon="google"
            style={{ backgroundColor: "#E57373" }}
          >
            Google
          </Button>
        </View>
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   inputContainer: {
//     width: "80%",
//     marginVertical: 10,
//   },
//   inputField: {
//     maxHeight: 70,
//     marginVertical: 10,
//     borderRadius: 40,
//   },
// });
