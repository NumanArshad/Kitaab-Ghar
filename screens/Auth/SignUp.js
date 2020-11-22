import React, { useRef, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { Headline, Button } from "react-native-paper";
import app_icon from "../../assets/app_icon.png";
import styles from "./styles";
import InputField from "../../components/InputField";
import firebase from "../../utils/firebaseConfig/config";
import { ToastRendered, success, error } from "../../utils/ToastNotification";

export default function SignUp({ navigation }) {
  const userCollection = firebase.firestore().collection("users");

  const [formData, setFormData] = useState({
    role: "shopKeeper",
    email: "",
    password: "",
  });
  const { role, email, password } = formData;
  const [showIndicator, setShowIndicator] = useState(false);

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleRole = (selectedRole) => {
    if (role !== selectedRole) {
      setFormData({ ...formData, role: selectedRole });
    }
  };

  const handleSubmit = async () => {
    setShowIndicator(true);
    try {
      const hitEndpoint = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const {
        user: { uid },
      } = hitEndpoint;
      userCollection
        .add({ userId: uid, role })
        .then((res) => {
          success("SignUp success", "Sign up successfully!");
          setShowIndicator(false);
          navigation.navigate("home");
        })
        .catch((err) => alert("colection error" + err));
    } catch (err) {
      error("SignUp error", err?.message);
      setShowIndicator(false);
    }
  };

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
      <Headline>SignUp</Headline>
      <Image source={app_icon} style={{ width: 100, height: 100 }} />
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          mode={role === "shopKeeper" ? "contained" : "outlined"}
          style={styles.borderRadius}
          onPress={() => handleToggleRole("shopKeeper")}
        >
          Shop keeper
        </Button>
        <Button
          mode={role === "customer" ? "contained" : "outlined"}
          style={styles.borderRadius}
          onPress={() => handleToggleRole("customer")}
        >
          Customer
        </Button>
      </View>
      <View style={styles.inputContainer}>
        <InputField
          extendStyles={[styles.inputField, styles.borderRadius]}
          placeholder="email"
          underlineColor="transparent"
          keyboardType="email-address"
          onChangeText={(text) => handleChange(text, "email")}
          value={email}
        />
        <InputField
          placeholder="password"
          underlineColor="transparent"
          extendStyles={[styles.inputField, styles.borderRadius]}
          onChangeText={(text) => handleChange(text, "password")}
          value={password}
        />
      </View>
      {/* <ActivityIndicator size="large" color="white" /> */}
      <Button
        mode="contained"
        style={[styles.submitButton, styles.borderRadius]}
        onPress={handleSubmit}
      >
        {showIndicator ? `Loading ...` : `Sign Up`}
      </Button>

      <Text
        style={{ textAlign: "left", width: "80%", marginTop: 10 }}
        onPress={() => navigation.goBack()}
      >
        back to login
      </Text>
    </View>
  );
}
