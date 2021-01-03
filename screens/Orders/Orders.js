import { useFocusEffect } from "@react-navigation/native";
import React, {useCallback} from "react";
import { View, Text, FlatList, Image } from "react-native";
import { Surface, Button, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/orders/orders.actions";

const Orders = () => {
  const dispatch = useDispatch();
  const { all_orders } = useSelector((state) => state.orders);
  const { is_loading } = useSelector((state) => state.loading);

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllOrders());
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
        <View >
          <Text>
            {item.orderBy} {item.orderDate}
          </Text>
          <Text>{JSON.stringify(item.orderedBooks)}</Text>
        </View>
      </View>
    </Surface>
  );


  return (
    <View>
      {is_loading || !all_orders ? (
        <Text>...loading</Text>
      ) : (
        <>
          {!all_orders.length ? (
            <Text>No orders found</Text>
          ) : (
            <FlatList data={all_orders} renderItem={renderItem} />
          )}
        </>
      )}
      <Text></Text>
    </View>
  );
};

export default Orders;
