import React, { useLayoutEffect } from "react";
import { View, Text } from "react-native";
import { Button, Surface } from "react-native-paper";
//import styles from "../../components/InputField";
import InputField from "../../components/InputField";
import Icons from "react-native-vector-icons/AntDesign";

const CreateEditBook = ({ navigation }) => {
  return (
    <View style={{ padding: 10 }}>
      <InputField
        label="Book Name"
        //      style={styles.customInField}
        //  value={text}
        //  onChangeText={(text) => setText(text)}
      />
      <InputField
        label="Auth name"
        //    style={{ maxHeight: 70 }}

        //  value={text}
        //  onChangeText={(text) => setText(text)}
      />
      <InputField
        label="edition"
        //  style={{ maxHeight: 60 }}

        //  value={text}
        //  onChangeText={(text) => setText(text)}
      />
      <InputField
        label="publisher"
        //  style={{ maxHeight: 60 }}

        //  value={text}
        //  onChangeText={(text) => setText(text)}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Button mode="contained">Upload Image</Button>
        <Surface
          style={{
            elevation: 4,
            width: "40%",
            paddingHorizontal: 10,
            height: 150,
            borderRadius: 10,
          }}
        ></Surface>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Button mode="outlined">Clear</Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("secondaryinfo")}
        >
          Next
          <Icons name="arrowright" />
        </Button>
      </View>
    </View>
  );
};

export default CreateEditBook;
