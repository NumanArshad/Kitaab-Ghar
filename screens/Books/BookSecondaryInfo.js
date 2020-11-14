import { useTheme } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import InputField from "../../components/InputField";
const BookSecondaryInfo = ({ navigation }) => {
  return (
    <View style={{ padding: 10 }}>
      <InputField
        label="Stock"
        //  style={{ maxHeight: 60 }}
        //  value={text}
        //  onChangeText={(text) => setText(text)}
      />
      <InputField
        label="Cost"
        //  style={{ maxHeight: 60 }}
        //  value={text}
        //  onChangeText={(text) => setText(text)}
      />
      <InputField
        label="Selling Price"
        //  style={{ maxHeight: 60 }}
        //  value={text}
        //  onChangeText={(text) => setText(text)}
      />

      <InputField
        label="ISBN"
        //  style={{ maxHeight: 60 }}
        //  value={text}
        //  onChangeText={(text) => setText(text)}
      />
      <Button mode="contained" style={{marginTop:10}}
      onPress={()=>navigation.navigate("home")}>Submit</Button>
    </View>
  );
};

export default BookSecondaryInfo;
