import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors, pageView } from "../constants/Colors";
import { EvilIcons } from "@expo/vector-icons";
import HeadingText from "../utils/HeadingText";

const Search = ({ navigation }) => {
  return (
    <View style={pageView}>
      <HeadingText text="Search" />
      {/* search button */}

      <TouchableOpacity
        onPress={() => navigation.navigate("placement")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.veryLightGrey,
          width: "100%",
          // padding: 10,
          paddingHorizontal: 10,
          borderRadius: 13,
        }}
      >
        <EvilIcons name="search" size={30} color={Colors.lightGrey} />
        <TextInput
          placeholder="Search"
          style={{
            color: Colors.lightGrey,
            fontSize: 16,
            paddingHorizontal: 10,
            // borderWidth: 1,
            flex: 1,
            padding: 10,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
