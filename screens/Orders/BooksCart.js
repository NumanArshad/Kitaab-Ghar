import React, { useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TextInputBase,
} from "react-native";

import { Surface, Button, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  clearWishLists,
  getAllWishListBooks,
} from "../../redux/books/books.actions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from "@react-navigation/native";
import handleAndroidToast from "../../utils/toastAndroid";
import InputField from "../../components/InputField";
import { useState } from "react/cjs/react.development";
import isEmpty from "../../utils/isEmpty";
import { placeOrder, updateCartList } from "../../redux/orders/orders.actions";
import { getCurrentUser } from "../../redux/auth/auth.actions";
import firebase from "../../utils/firebaseConfig/config";
import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const BooksCart = () => {
  const dispatch = useDispatch();
  const {
    colors: { primary },
  } = useTheme();
  const { all_cart_items_list } = useSelector((state) => state.orders);
  const { is_loading } = useSelector((state) => state.loading);

  const handleItemQty = (index, qty) => {
    const cartList = [...all_cart_items_list];
    cartList[index].prQty = qty;
    dispatch(updateCartList(cartList));
  };

  const handlePlaceOrder = () => {
    const cartList = all_cart_items_list.map(({ id: bookId, prQty }) => {
      return { bookId, prQty };
    });

    const data = {
      orderBy: getCurrentUser()?.userId,
      orderDate: dayjs().format("LLL"),
      orderedBooks: cartList,
    };

    console.log("submit detail is ", data);
    dispatch(placeOrder(data));
  };

  const renderItem = ({ item, index }) => (
    <Surface
      style={{
        elevation: 4,
        flexDirection: "row",
        marginVertical: 5,
        padding: 5,
        margin: 4,
      }}
    >
      <Image
        source={{ uri: item.imageUri }}
        style={{ width: 80, height: 100 }}
      />
      <View style={{ paddingHorizontal: 10, marginVertical: 5, flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>
            {item.bookName} {item.edition} edition
          </Text>
          <TextInput
            underlineColorAndroid={primary}
            keyboardType="number-pad"
            onChangeText={(text) => handleItemQty(index, text)}
            style={{ width: 50, paddingBottom: 5 }}
            // maxLength={item.sellingPrice.toString().length}
            value={item?.prQty}
          />
        </View>

        <Text>{item.author} </Text>
        <Text>{item.publisher}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{item.stock}</Text>
          <Text>{item.sellingPrice}</Text>
        </View>
      </View>
    </Surface>
  );

  return (
    <View>
      <View style={{ height: "93.5%" }}>
        <FlatList data={all_cart_items_list} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default BooksCart;
