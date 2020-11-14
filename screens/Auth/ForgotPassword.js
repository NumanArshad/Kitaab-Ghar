import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { TextInput, Headline, Button  } from "react-native-paper";
import app_icon from "../../assets/app_icon.png";
import styles from "./styles";

export default function ForgotPassword({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: "30%",
        alignItems: "center",

        backgroundColor: "white",
      }}
    >
      <Headline>Reset Password</Headline>
      <Image source={app_icon} style={{ width: 100, height: 100 }} />
      <View style={styles.inputContainer}>
        <TextInput
        style={[styles.inputField, styles.borderRadius]}
          placeholder="Email"
          mode="flat"
          keyboardType="email-address"
          underlineColor="transparent"

        />
        
      </View>
      <Button
        mode="contained"
        style={[styles.submitButton, styles.borderRadius]}
      >
        Send Email
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

