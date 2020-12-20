import React, { useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  RefreshControl,
  Button,
  ToastAndroid,
} from "react-native";
import { Surface } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  clearWishLists,
  getAllWishListBooks,
} from "../../redux/books/books.actions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from "@react-navigation/native";
import handleAndroidToast from "../../utils/toastAndroid";

export default function WishList() {
  const dispatch = useDispatch();
  const { wish_lists_books } = useSelector((state) => state.books);
  const { is_loading } = useSelector((state) => state.loading);

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllWishListBooks());
    }, [dispatch])
  );

  useFocusEffect(
    useCallback(() => {
      return () => dispatch(clearWishLists());
    }, [dispatch])
  );

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
          <MaterialCommunityIcons
            name="cart-plus"
            onPress={() =>
              navigation.navigate("MyCart", {
                screen: "CartItem",
                params: { bookDetail: item },
              })
            }
            size={25}
          />
        </View>
        <Text>{item.author}</Text>
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
      <Button title="toast" onPress={() => handleAndroidToast("welcome")} />

      {is_loading ? (
        <Text>...loading</Text>
      ) : (
        <FlatList
          //horizontal={false}
          key={"#"}
          data={wish_lists_books}
          // refreshing={false}
          renderItem={renderItem}
          keyExtractor={(item) => "#" + item.id}
          refreshControl={
            <RefreshControl
              refreshing={is_loading}
              onRefresh={() => dispatch(getAllWishListBooks())}
            />
          }
        />
      )}
    </View>
  );
}
