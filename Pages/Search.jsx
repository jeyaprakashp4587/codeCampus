import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors, pageView } from "../constants/Colors";
import { EvilIcons } from "@expo/vector-icons";
import HeadingText from "../utils/HeadingText";
import axios from "axios";
import { debounce } from "lodash";
import Api from "../Api";
import { FlatList } from "react-native";
import { Dimensions } from "react-native";
import Ripple from "react-native-material-ripple";
import { useData } from "../Context/Contexter";

const Search = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const { setSelectedUser } = useData();
  const userName = useRef(null);
  const [users, setUsers] = useState();
  const handleSearch = debounce((text) => {
    userName.current = text;
    getUserName();
  }, 100);
  const getUserName = async () => {
    const res = await axios.post(`${Api}/Search/getUserName`, {
      userName: userName.current,
    });
    if (res.data) {
      setUsers(res.data);
    }
  };
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
          focusable={true}
          onChangeText={handleSearch}
        />
      </TouchableOpacity>
      {/* usersList */}
      {users?.length > 0 && (
        <FlatList
          data={users}
          style={{ marginTop: 20 }}
          renderItem={(user) => (
            <TouchableOpacity
              style={{
                width: "100%",
                padding: height * 0.015,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                columnGap: 10,
                marginTop: 10,
                marginBottom: 10,
                width: "98%",
                alignSelf: "center",
                elevation: 3,
                backgroundColor: "white",
                borderRadius: 5,
              }}
            >
              <Image
                source={{ uri: user.item?.Images?.profile }}
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 50,
                  resizeMode: "contain",
                }}
              />
              <Text style={{ letterSpacing: 1, color: Colors.mildGrey }}>
                {user.item.firstName} {user.item.LastName}
              </Text>
              <Ripple
                onPress={() => {
                  navigation.navigate("userprofile");
                  setSelectedUser(user.item);
                }}
                style={{ backgroundColor: Colors.violet, borderRadius: 10 }}
              >
                <Text
                  style={{ color: "white", padding: 10, paddingHorizontal: 15 }}
                >
                  View
                </Text>
              </Ripple>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
