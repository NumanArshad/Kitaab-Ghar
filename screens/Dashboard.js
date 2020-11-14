import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  useTheme,
  Surface,
} from "react-native-paper";
import Icons from "react-native-vector-icons/SimpleLineIcons";
import OptionIcons from "react-native-vector-icons/Ionicons";

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

export default function Dashboard() {
  const [isGridView, triggerGridView] = useState(true);

  const renderItem = ({ item, index }) =>
    isGridView ? (
      <Card style={styles.dashboardCard}>
        <Card.Cover
          source={{ uri: "https://picsum.photos/700" }}
          style={{ height: 130 }}
        />
        <Card.Content>
          <Title>Card title {index}</Title>
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
          source={{ uri: "https://picsum.photos/700" }}
          style={{ width: 80, height: 100 }}
        />
        <View style={{ paddingHorizontal: 10, marginVertical: 5, flex: 1 }}>
          <Text>Book Name 7th edition</Text>
          <Text>written by</Text>
          <Text>Publisher</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Stock</Text>
            <Text>Price</Text>
          </View>
        </View>
      </Surface>
    );
  return (
    <View style={styles.dashboadContainer}>
      <View
        style={{ flexDirection: "row", marginRight: 10, marginVertical: 10 }}
      >
        <Text>Count books</Text>
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
        <FlatList
          //horizontal={false}
          key={"_"}
          numColumns={2}
          data={DATA}
          // refreshing={false}
          renderItem={renderItem}
          keyExtractor={(item) => "_" + item.key}
        />
      ) : (
        <FlatList
          //horizontal={false}
          key={"#"}
          data={DATA}
          // refreshing={false}
          renderItem={renderItem}
          keyExtractor={(item) => "#" + item.key}
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
