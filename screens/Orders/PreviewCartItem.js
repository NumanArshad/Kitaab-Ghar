import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Alert,
} from "react-native";
import {
  Button,
  Surface,
  useTheme,
  Searchbar,
  TextInput,
} from "react-native-paper";
import InputField from "../../components/InputField";
import Icons from "react-native-vector-icons/AntDesign";
import { SliderBox } from "react-native-image-slider-box";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { removeBook, updateBook } from "../../redux/books/books.actions";
import { useFocusEffect } from "@react-navigation/native";
import { getCurrentUser } from "../../redux/auth/auth.actions";
import handleAndroidToast from "../../utils/toastAndroid";
import { addToCart, removeFromCart } from "../../redux/orders/orders.actions";

const PreviewCartItem = ({ navigation, route }) => {
  const {
    colors: { primary, surface },
  } = useTheme();

  const { userId } = getCurrentUser();

  const dispatch = useDispatch();

  const { bookInfo: single_book } = route.params;

  const { all_cart_items_list } = useSelector((state) => state.orders);

  const [wishList, setWishList] = useState(single_book?.wishListUsers || []);

  const isExistInCart = (bookId) => {
    return all_cart_items_list.find(({ id }) => id === bookId);
  };

  const isFavorite = () => {
    return wishList.some((user) => user === userId);
  };

  const isCreatedBy = () => {
    return single_book?.createdByUserId === userId;
  };

  const handleDeleteBook = () => {
    Alert.alert("Remove Book", "Are you sure you want to delete book ?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => dispatch(removeBook(single_book?.id, navigation)),
      },
    ]);
  };

  const handleToggleWishList = () => {
    let updateList = [...wishList];
    if (isFavorite()) {
      updateList = updateList.filter(
        (userId) => userId !== getCurrentUser()?.userId
      );
      handleAndroidToast("Remove from favorite");
    } else {
      updateList = [...updateList, getCurrentUser()?.userId];

      handleAndroidToast("Add to favorite");
    }
    // //console.log(updateList)
    setWishList(updateList);

    dispatch(
      updateBook({
        ...single_book,
        wishListUsers: updateList,
      })
    );
  };

  const handleSubmitPreview = () => {
    if (isCreatedBy()) {
      navigation.navigate("sellbooks", {
        screen: "sellbooks",
        params: {
          single_book: { ...single_book, wishListUsers: wishList },
        },
      });
    } else {
      const isExist = isExistInCart(single_book.id);
      dispatch(
        !isExist
          ? addToCart({ ...single_book, prQty: "1" })
          : removeFromCart(single_book.id)
      );
      handleAndroidToast(`${!isExist ? `Added to` : "Remove from"} cart`);
    }
  };

  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight,
        flex: 1,
      }}
    >
      <View
        style={{
          // flexDirection: "row",
          backgroundColor: "grey",
        }}
      >
        <LinearGradient
          // Button Linear Gradient
          //     colors={["#a6a3a3", "#d7dadb", "#a6a3a3"]}
          // locations={[0, 0.55,  0.8]}
          colors={[primary, surface, primary]}
          locations={[0, 0.5, 1]}
        >
          <Icons
            size={23}
            name="arrowleft"
            color="black"
            style={{ position: "absolute", padding: 20, zIndex: 1 }}
            onPress={() => navigation.goBack()}
          />
          <SliderBox
            images={[
              //"https://source.unsplash.com/1024x768/?nature",
              single_book?.imageUri,
              "https://source.unsplash.com/1024x768/?water",
              "https://source.unsplash.com/1024x768/?girl",
              "https://source.unsplash.com/1024x768/?tree",
            ]}
            sliderBoxHeight={300}
            onCurrentImagePressed={(index) =>
              console.warn(`image ${index} pressed`)
            }
            dotColor={"white"}
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ width: "60%" }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 15,
              marginHorizontal: 5,
              padding: 0,
              margin: 0,
            }}
            autoplay
            circleLoop
          />
        </LinearGradient>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.rowItem}>
          <MaterialIcons name="favorite-border" size={20} color="lightgrey" />
        </View>
        <View style={[styles.rowItem, styles.centeritemBorder]}>
          <Text style={{ fontSize: 11.5 }}>Status: Available</Text>
        </View>
        <View style={styles.rowItem}>
          {isCreatedBy() ? (
            <AntDesign name="delete" size={20} onLongPress={handleDeleteBook} />
          ) : (
            <MaterialIcons
              name={`${isFavorite() ? `favorite` : `favorite-border`}`}
              size={20}
              onPress={handleToggleWishList}
            />
          )}
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <Text>
          {single_book?.bookName} : {single_book?.edition} edition
        </Text>
        <Text>{single_book?.author}</Text>
        <Text>{single_book?.publisher}</Text>
        <Text>{single_book?.stock}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {single_book?.sellingPrice}
        </Text>
      </View>

      <View
        style={{
          borderTopColor: "grey",
          borderTopWidth: 0.5,
          borderBottomColor: "grey",
          borderBottomWidth: 0.5,
          padding: 10,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Description</Text>
        <Text>book description here</Text>
      </View>

      <Surface
        style={{
          elevation: 4,
          marginTop: "auto",
          width: "90%",
          alignSelf: "center",
          marginBottom: 10,
        }}
      >
        <Button mode="contained" onPress={handleSubmitPreview}>
          {isCreatedBy()
            ? `Edit`
            : isExistInCart(single_book?.id)
            ? "Remove from Cart"
            : "Add to Cart"}
        </Button>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  rowItem: {
    flex: 0.34,

    width: "100%",
    flexDirection: "row",
    padding: 15,
    justifyContent: "center",
  },
  centeritemBorder: {
    borderLeftColor: "grey",
    borderLeftWidth: 0.5,
    borderRightColor: "grey",
    borderRightWidth: 0.5,
  },
});

export default PreviewCartItem;
