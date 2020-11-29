import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Button, Surface, useTheme,Searchbar,TextInput } from "react-native-paper";
import InputField from "../../components/InputField";
import Icons from "react-native-vector-icons/AntDesign";
import { SliderBox } from "react-native-image-slider-box";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";

const PreviewCartItem = ({ navigation }) => {
  const {
    colors: { primary, surface },
  } = useTheme();

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
          // locations={[0, 0.55, 0.8]}
          colors={[primary, surface, primary]}
          locations={[0, 0.5, 1]}
        >
          <Icons
            size={23}
            name="arrowleft"
            color="black"
            style={{ position: "absolute", padding: 20, zIndex: 1 }}
          />
          <SliderBox
            images={[
              "https://source.unsplash.com/1024x768/?nature",
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
          <MaterialIcons name="favorite-border" size={20} />
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <Text>Oxford : edition</Text>
        <Text>by writter</Text>
        <Text>publisher</Text>
        <Text>available stock</Text>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>price</Text>
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
        <Button mode="contained" onPress={() => navigation.navigate("MyCart")}>
          Buy now
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
