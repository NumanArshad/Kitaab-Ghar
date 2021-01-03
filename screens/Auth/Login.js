import React, { useEffect, useState } from "react";
import { View, Text, Image, Alert, BackHandler } from "react-native";
import { TextInput, Headline, Button, useTheme } from "react-native-paper";
import app_icon from "../../assets/app_icon.png";
import styles from "./styles";
import InputField from "../../components/InputField";
import firebase from "../../utils/firebaseConfig/config";
import { ToastRendered, success, error } from "../../utils/ToastNotification";
import { googleSignIn, signInUser } from "../../redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { isLoading } from "../../redux/loading/loading.actions";
import * as GoogleSignIn from "expo-google-sign-in";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react/cjs/react.development";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const { is_loading } = useSelector((state) => state.loading);
  const backPressHandler = () => {
    Alert.alert("Exit from Kitaab Ghar!", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Yes", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    //navigation.navigate("home");
    dispatch(isLoading());
    dispatch(signInUser(email, password, navigation));
  };

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backPressHandler
      );

      return () => backHandler.remove();
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
        paddingTop: "30%",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <ToastRendered />
      <Headline>Login</Headline>
      <Image source={app_icon} style={{ width: 120, height: 120 }} />
      <View style={styles.inputContainer}>
        <InputField
          extendStyles={[styles.inputField, styles.borderRadius]}
          placeholder="Email"
          underlineColor="transparent"
          keyboardType="email-address"
          onChangeText={(text) => handleChange(text, "email")}
          value={email}
        />
        <InputField
          extendStyles={[styles.inputField, styles.borderRadius]}
          placeholder="Password"
          underlineColor="transparent"
          onChangeText={(text) => handleChange(text, "password")}
          value={password}
        />
      </View>
      <Button
        mode="contained"
        style={[styles.submitButton, styles.borderRadius]}
        onPress={handleSubmit}
      >
        {is_loading ? `...Loading` : `Login`}
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
            onPress={() => googleSignIn()}
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
