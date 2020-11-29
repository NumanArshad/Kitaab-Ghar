import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { Button, Surface } from "react-native-paper";
//import styles from "../../components/InputField";
import InputField from "../../components/InputField";
import Icons from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";

const CreateEditBook = ({ navigation }) => {
  const [formData, setFormData] = useState({
    bookName: "",
    author: "",
    edition: "",
    publisher: "",
    imageUri: "",
  });
  const { bookName, author, edition, publisher, imageUri } = formData;

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
        // else {
        //   alert("good granted");
        // }
      }
    })();
  }, []);

  const handleImagePicker = async (_) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.cancelled) {
      const { uri: imageUri } = result;
      alert(imageUri);
      setFormData({ ...formData, imageUri });
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <InputField
        label="Book Name"
        value={bookName}
        onChangeText={(text) => handleChange("bookName", text)}
      />
      <InputField
        label="Auth name"
        value={author}
        onChangeText={(text) => handleChange("author", text)}
      />
      <InputField
        label="edition"
        value={edition}
        onChangeText={(text) => handleChange("edition", text)}
      />
      <InputField
        label="publisher"
        value={publisher}
        onChangeText={(text) => handleChange("publisher", text)}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Button mode="contained" onPress={handleImagePicker}>
          Upload Image
        </Button>
        <Surface
          style={{
            elevation: 4,
            width: 150,
            height: 150,
            borderRadius: 10,
          }}
        >
          <Image
            source={{ uri: imageUri }}
            style={{ width: "100%", height: "100%" }}
          />
        </Surface>
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
          onPress={() =>
            navigation.navigate("secondaryinfo", { basicInfo: formData })
          }
        >
          Next
          <Icons name="arrowright" />
        </Button>
      </View>
    </View>
  );
};

export default CreateEditBook;
