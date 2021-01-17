import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Surface,
} from "react-native-paper";
import * as Permissions from "expo-permissions";
import Icons from "react-native-vector-icons/SimpleLineIcons";
import OptionIcons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../redux/books/books.actions";
import { useFocusEffect } from "@react-navigation/native";
import ContentLoader from "react-native-easy-content-loader";
import { addToCart, removeFromCart } from "../redux/orders/orders.actions";
import Notification from "./notification";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const DATA = [
  {
    key: "1",
    title: "First Item",
  },
  {
    key: "2",
    title: "Second Item",
  },
  {
    key: "3",
    title: "Third Item",
  },
  {
    key: "4",
    title: "Third Item",
  },
  {
    key: "5",
    title: "Third Item",
  },
  {
    key: "6",
    title: "Third Item",
  },
  {
    key: "7",
    title: "Third Item",
  },
  {
    key: "8",
    title: "Third Item",
  },
  {
    key: "9",
    title: "Third Item",
  },
  {
    key: "15",
    title: "Third Item",
  },
  {
    key: "16",
    title: "Third Item",
  },
  {
    key: "17",
    title: "Third Item",
  },
  {
    key: "18",
    title: "Third Item",
  },
];

export default function Dashboard({ navigation, route }) {
  const dispatch = useDispatch();
  const { all_books, lastVisible, count } = useSelector((state) => state.books);
  const { is_loading } = useSelector((state) => state.loading);
  const { all_cart_items_list } = useSelector((state) => state.orders);

  // useFocusEffect(
  //   useCallback(() => {
  //     dispatch(getAllBooks());
  //   }, [dispatch])
  // );

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  const handleToggleCart = (bookInfo) => {
    navigation.navigate("bookDetail", {
      screen: "bookDetail",
      params: { bookInfo },
    });
  };

  const handelLoadMore = () => {
    count !== all_books?.length && dispatch(getAllBooks("concat", lastVisible));
  };

  const isExistInCart = (bookId) => {
    return all_cart_items_list.find(({ id }) => id === bookId);
  };

  const [isGridView, triggerGridView] = useState(false);
  const renderItem = ({ item, index }) =>
    isGridView ? (
      <Card
        style={styles.dashboardCard}
        onPress={() => navigation.navigate("CartItem")}
      >
        <Card.Cover
          source={{ uri: "https://picsum.photos/700" }}
          style={{ height: 130 }}
        />
        <Card.Content>
          <Title>
            {item.bookName} {item.id}
          </Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    ) : (
      <Surface
        style={{
          elevation: 4,
          flexDirection: "row",
          marginVertical: 5,
          padding: 5,
          marginRight: 10,
        }}
        key={item.id}
        // onTouchStart={(event) => {
        //   event.stopPropagation();
        // }}
      >
        <Image
          source={{ uri: item.imageUri }}
          style={{ width: 80, height: 100 }}
        />
        <View style={{ paddingHorizontal: 10, marginVertical: 5, flex: 1 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>
              {item.bookName} {item.edition} edition
            </Text>
            <MaterialCommunityIcons
              name={`cart-${isExistInCart(item.id) ? `minus` : `plus`}`}
              onPress={() => handleToggleCart(item)}
              size={25}
            />
          </View>
          <Text>{item.author}</Text>
          <Text>{item.publisher}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>{item.stock}</Text>
            <Text>{item.sellingPrice}</Text>
          </View>
        </View>
      </Surface>
    );
  return (
    <View style={styles.dashboadContainer}>
      {/* <Notification /> */}
      {/* <Button onPress={handlePermissons}>permissons</Button> */}
      <View
        style={{ flexDirection: "row", marginRight: 10, marginVertical: 10 }}
      >
        <Text>
          `` Count books : {is_loading ? `...loading count` : all_books?.length}
        </Text>
        <OptionIcons
          name="ios-options"
          style={{
            marginLeft: "auto",
            paddingRight: 10,
            marginRight: 10,
            borderRightWidth: 0.5,
            borderRightColor: "#C0C0C0",
          }}
          size={20}
        />
        <Icons
          name="grid"
          size={20}
          onPress={() => triggerGridView(!isGridView)}
        />
      </View>
      {isGridView ? (
        is_loading ? (
          <Text>loading...</Text>
        ) : (
          <FlatList
            //horizontal={false}
            key={"_"}
            numColumns={2}
            data={DATA}
            // refreshing={false}
            renderItem={renderItem}
            keyExtractor={(item) => "_" + item.key}
            refreshControl={
              <RefreshControl
                refreshing={is_loading}
                onRefresh={() => dispatch(getAllBooks())}
              />
            }
          />
        )
      ) : is_loading ? (
        <Text>...loading</Text>
      ) : (
        <FlatList
          //horizontal={false}
          key={"#"}
          data={all_books}
          // refreshing={false}
          renderItem={renderItem}
          keyExtractor={(item) => "#" + item.id}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={is_loading}
          //     onRefresh={() => dispatch(getAllBooks())}
          //   />
          // }
          onEndReachedThreshold={0.1} ////trigger target element number/ total element
          //  onMomentumScrollBegin={()=>console.log("scroll begin")}
          onEndReached={handelLoadMore}
          //  onMomentumScrollEnd={()=>console.log("scroll end")}
          scrollEnabled={!is_loading}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dashboadContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  dashboardCard: {
    width: "47.5%",
    marginRight: 10,
    marginBottom: 10,
    elevation: 4,
  },
});
