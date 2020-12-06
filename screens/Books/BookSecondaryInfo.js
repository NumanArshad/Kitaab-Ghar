import { useTheme } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/InputField";
import { createBookCollection } from "../../redux/books/books.actions";
import isEmpty from "../../utils/isEmpty";
import firebase from "../../utils/firebaseConfig/config";
import { error, success, ToastRendered } from "../../utils/ToastNotification";
import { isLoading } from "../../redux/loading/loading.actions";

const BookSecondaryInfo = ({ navigation, route }) => {
  const rootStorageRef = firebase.storage().ref();

  const { basicInfo } = route?.params;

  const dispatch = useDispatch();
  const { is_loading } = useSelector((state) => state.loading);

  const [formData, setFormData] = useState({
    stock: "",
    cost: "",
    sellingPrice: "",
    ISBN: "",
  });
  const { stock, cost, sellingPrice, ISBN } = formData;

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageupload = async () => {
    
     dispatch(isLoading())
    const UriStringList = basicInfo.imageUri.split(".");
    const currentTimeStamp = new Date().getTime();
    const fileName = currentTimeStamp + UriStringList[UriStringList.length - 1];

    const blobInput = await fetch(basicInfo.imageUri);
    const blob = await blobInput.blob();

    try {
      const storageRef = rootStorageRef.child(`books/${fileName}`);
      await storageRef.put(blob);
      //.then();
      success("Image Upload", "Image uploaded successfully!");
      const downloadUrl = await storageRef.getDownloadURL();
    
      handleSubmit(downloadUrl);
    } catch (err) {
      error("Error Image Upload", err.message);

      Promise.reject(err)
    }
  };

  const handleSubmit = (downloadUrl) => {
    dispatch(
      createBookCollection({
        ...basicInfo,
        imageUri: downloadUrl,
        ...formData,
      }, navigation)
    );
  };

  return (
    <View style={{ padding: 10 }}>
      <ToastRendered />
      <InputField
        label="Stock"
        value={stock}
        onChangeText={(text) => handleChange("stock", text)}
      />
      <InputField
        label="Cost"
        value={cost}
        onChangeText={(text) => handleChange("cost", text)}
      />
      <InputField
        label="Selling Price"
        value={sellingPrice}
        onChangeText={(text) => handleChange("sellingPrice", text)}
      />

      <InputField
        label="ISBN"
        value={ISBN}
        onChangeText={(text) => handleChange("ISBN", text)}
      />
      <Button
        mode="contained"
        style={{ marginTop: 10 }}
        onPress={handleImageupload}
      >
        {is_loading ? `...Loading` : `Submit`}
      </Button>
    </View>
  );
};

export default BookSecondaryInfo;
