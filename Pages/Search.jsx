import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUniversity, faUser } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Search = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const { setSelectedUser, user } = useData();
  const userName = useRef(null);
  const [history, setHistory] = useState([]);
  const [users, setUsers] = useState();
  const handleSearch = debounce((text) => {
    userName.current = text;
    getUserName();
  }, 100);
  // get userName
  const getUserName = async () => {
    const res = await axios.post(`${Api}/Search/getUserName/${user._id}`, {
      userName: userName.current.trim(),
    });
    if (res.data) {
      // console.log(res.data);
      setUsers(res.data);
    }
  };
  //  search history
  const updateSearchHistory = useCallback((term) => {
    setHistory((prevHistory) => {
      const newHistory = [
        term,
        ...prevHistory.filter((item) => item.firstName !== term.firstName),
      ].slice(0, 5);
      AsyncStorage.setItem("history", JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);
  // render pages
  const ResultRender = () => {
    if (users?.length > 0) {
      return (
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
                // justifyContent: "space-between",
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
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={{ letterSpacing: 1, color: Colors.mildGrey }}>
                  {user.item.firstName} {user.item.LastName}
                </Text>
                <Text
                  style={{
                    letterSpacing: 1,
                    color: Colors.mildGrey,
                    fontSize: width * 0.03,
                  }}
                >
                  {user.item.InstitudeName}
                </Text>
              </View>
              <Ripple
                onPress={() => {
                  navigation.navigate("userprofile");
                  setSelectedUser(user.item);
                  updateSearchHistory(user.item);
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
      );
    } else {
      return (
        <Text
          style={{
            fontSize: width * 0.07,
            color: Colors.lightGrey,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          No result found!
        </Text>
      );
    }
  };
  // check the history
  useEffect(() => {
    const loadHistory = async () => {
      const savedHistory = await AsyncStorage.getItem("history");
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    };
    loadHistory();
  }, []);
  //
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
          borderRadius: 7,
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
      {/* show history list */}
      {history.length > 0 && (
        <View>
          {history.map((term, index) => (
            <Text key={index}>{term.firstName}</Text>
          ))}
        </View>
      )}
      {/* usersList */}
      <ResultRender />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
