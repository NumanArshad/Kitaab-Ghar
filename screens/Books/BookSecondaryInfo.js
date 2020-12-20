import { useTheme } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, BackHandler } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/InputField";
import {
  updateBook,
  createBookCollection,
} from "../../redux/books/books.actions";
import isEmpty from "../../utils/isEmpty";
import firebase from "../../utils/firebaseConfig/config";
import { error, success, ToastRendered } from "../../utils/ToastNotification";
import { isLoading } from "../../redux/loading/loading.actions";
import { getCurrentUser } from "../../redux/auth/auth.actions";
import { CommonActions } from "@react-navigation/native";

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

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () =>
      //alert("back press")
      navigation.navigate("home")
    );
    return () => backHandler.remove();
  }, []);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  ////console.log("in secondary", route.params);
  useEffect(() => {
    if (route.params?.single_book) {
      const { stock, cost, sellingPrice, ISBN } = route.params?.single_book;

      setFormData({ stock, cost, sellingPrice, ISBN });
    }
  }, [route.params?.single_book]);

  const handleReset = () => {
    // navigation.dispatch((state) => {
    //   //console.log("navigation history is", state);
    // });
  };

  const handleImageupload = async () => {
    dispatch(isLoading());
    if (route.params?.single_book) {
      handleSubmit();
      return;
    }
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

      Promise.reject(err);
    }
  };

  const handleSubmit = (downloadUrl) => {
    const data = {
      ...basicInfo,
      ...formData,
      createdByUserId: getCurrentUser()?.userId,
    };

    dispatch(
      route.params?.single_book
        ? updateBook({ ...route.params.single_book, ...data })
        : createBookCollection(
            {
              ...data,
              imageUri: downloadUrl,
            },
            navigation
          )
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
      {/* <Button mode="contained" style={{ marginTop: 10 }} onPress={handleReset}>
        Reset
      </Button> */}
      <Button
        mode="contained"
        style={{ marginTop: 10 }}
        onPress={handleImageupload}
      >
        {is_loading
          ? `...Loading`
          : route.params?.single_book
          ? `Update`
          : `Submit`}
      </Button>
    </View>
  );
};

export default BookSecondaryInfo;
