import React, { useEffect, useState , useCallback} from "react";
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
import Icons from "react-native-vector-icons/SimpleLineIcons";
import OptionIcons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../redux/books/books.actions";
import { useFocusEffect } from "@react-navigation/native";

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
  const { all_books } = useSelector((state) => state.books);
  const { is_loading } = useSelector((state) => state.loading);

  useEffect(() => {
    console.log("yes")
    dispatch(getAllBooks());
  }, [dispatch]);

//   useFocusEffect(useCallback(()=>{
// console.log("is focused")

//   },[]))
//  console.log("length is ",all_books?.length);

  const [isGridView, triggerGridView] = useState(true);
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
          <Title>{item.bookName} {index}</Title>
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
        
      >
        <Image
          source={{ uri: item.imageUri }}
          style={{ width: 80, height: 100 }}
        />
        <View style={{ paddingHorizontal: 10, marginVertical: 5, flex: 1 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>{item.bookName}  {item.edition} edition
            {item.id}
            </Text>
            <MaterialCommunityIcons
              name="cart-plus"
              onPress={() =>
                navigation.navigate("MyCart", { screen: "CartItem" ,params: {id: item.id} })
              }
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
      {/* <SkeletonContent
        containerStyle={{ flex: 1, width: 300 }}
        isLoading={true}
        layout={[
          { key: "someId", width: 220, height: 20, marginBottom: 6 },
          { key: "someOtherId", width: 180, height: 20, marginBottom: 6 },
        ]}
      >
        <Text style={{width:"200px"}}>Your content</Text>
        <Text >Other content</Text>
      </SkeletonContent> */}

      <View
        style={{ flexDirection: "row", marginRight: 10, marginVertical: 10 }}
      >
        <Text>
          Count books : {is_loading ? `...loading count` : all_books?.length}
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
          <Text>...loading</Text>
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
          refreshControl={
            <RefreshControl
              refreshing={is_loading}
              onRefresh={() => dispatch(getAllBooks())}
            />
          }
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
