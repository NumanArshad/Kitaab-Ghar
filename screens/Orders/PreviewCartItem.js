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
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSingleBook,
  getSingleBook,
  updateBook,
} from "../../redux/books/books.actions";
import { useFocusEffect } from "@react-navigation/native";
import { getCurrentUser } from "../../redux/auth/auth.actions";

const PreviewCartItem = ({ navigation, route }) => {
  const {
    colors: { primary, surface },
  } = useTheme();

  const { userId } = getCurrentUser();

  // const { single_book } = useSelector((state) => state.books);

  const dispatch = useDispatch();

  const {
    bookDetail: single_book,
  } = route.params;
  const [wishList, setWishList] = useState(single_book?.wishListUsers || []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        console.log("hy", single_book, wishList);
      };
    }, [dispatch])
  );

  const isFavorite = () => {
    return wishList.some((user) => user === userId);
  };

  const isCreatedBy = () => {
    return single_book?.createdByUserId === userId;
  };

  const handleToggleWishList = () => {
    let updateList = [...wishList];
    if (isFavorite()) {
      updateList = updateList.filter(
        (userId) => userId !== getCurrentUser()?.userId
      );
    } else {
      updateList = [...updateList, getCurrentUser()?.userId];
    }
    // console.log(updateList)
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
          single_book: { ...single_book, wishListUsers: wishList }
        },
      });
    } else {
      navigation.navigate("MyCart");
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
          <MaterialIcons
            name={`${isFavorite() ? `favorite` : `favorite-border`}`}
            size={20}
            onPress={handleToggleWishList}
          />
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
          {isCreatedBy() ? `Edit` : `Buy now`}
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
