import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { TextInput, Headline, Button  } from "react-native-paper";
import app_icon from "../../assets/app_icon.png";
import styles from "./styles";

export default function SignUp({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: "30%",
        alignItems: "center",

        backgroundColor: "white",
      }}
    >
      <Headline>SignUp</Headline>
      <Image source={app_icon} style={{ width: 100, height: 100 }} />
      <View style={styles.inputContainer}>
        <TextInput
             style={[styles.inputField, styles.borderRadius]}
          placeholder="email"
          mode="flat"
          underlineColor="transparent"

          keyboardType="email-address"
        />
        <TextInput
          placeholder="password"
          underlineColor="transparent"
          style={[styles.inputField, styles.borderRadius]}
          mode="flat"
        />
      </View>
      <Button
        mode="contained"
        style={[styles.submitButton, styles.borderRadius]}
      >
        SignUp
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

