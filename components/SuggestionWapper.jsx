import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
import Ripple from "react-native-material-ripple";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPlus,
  faTimes,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { ScrollView } from "react-native";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import TopicsText from "../utils/TopicsText";
import ParagraphText from "../utils/PragraphText";
import Api from "../Api";
import axios from "axios";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useData } from "../Context/Contexter";
import { TouchableOpacity } from "react-native";

const SuggestionWapper = ({ trigger, refresh }) => {
  const { width, height } = Dimensions.get("window");
  const [profiles, setProfiles] = useState();
  const Navigation = useNavigation();
  const { setSelectedUser, user } = useData();
  // show suggestion users
  async function userSuggestions() {
    const res = await axios.get(`${Api}/Suggestions/users/${user._id}`);
    if (res.data) setProfiles(res.data);
  }
  //
  useEffect(() => {
    userSuggestions();
  }, []);
  useEffect(() => {
    userSuggestions();
  }, [refresh]);
  const HandleClose = () => {
    trigger(false);
  };

  return (
    <View style={{ flexDirection: "column", rowGap: 5 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* <Text
          style={{
            fontSize: width * 0.04,
            letterSpacing: 1,
            color: Colors.mildGrey,
          }}
        >
          Suggestions
        </Text> */}
        <ParagraphText text="Suggestions" />
        <TouchableOpacity onPress={HandleClose}>
          <FontAwesomeIcon icon={faTimes} size={18} color={Colors.mildGrey} />
        </TouchableOpacity>
      </View>
      {/* list */}
      <FlatList
        horizontal
        data={profiles}
        showsHorizontalScrollIndicator={false}
        renderItem={(user) => (
          <LinearGradient
            colors={["white", "white", "#f2f2f2"]}
            style={{ elevation: 2, margin: 5, borderRadius: 5 }}
            start={[0, 1]}
            end={[1, 1]}
          >
            <Ripple
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: width * 0.8,
                height: height * 0.1,
                paddingHorizontal: 15,
                columnGap: 10,
              }}
              onPress={() => {
                Navigation.navigate("userprofile");
                setSelectedUser(user.item._id);
              }}
            >
              <Image
                source={{ uri: user.item?.Images?.profile }}
                style={{
                  width: width * 0.15,
                  height: height * 0.07,
                  borderRadius: 50,
                  // borderWidth: 1,
                }}
              />
              <View style={{ borderWidth: 0, flex: 1 }}>
                <Text
                  style={{
                    fontSize: width * 0.04,
                    color: Colors.veryDarkGrey,
                    textTransform: "capitalize",
                  }}
                >
                  {user.item?.firstName} {user.item?.LastName}
                </Text>
                <Text
                  style={{ fontSize: width * 0.03, color: Colors.mildGrey }}
                >
                  {user.item?.InstitudeName}
                </Text>
              </View>
              <Ripple>
                <FontAwesomeIcon icon={faEye} color={Colors.violet} size={23} />
              </Ripple>
            </Ripple>
          </LinearGradient>
        )}
      />
    </View>
  );
};

export default SuggestionWapper;

const styles = StyleSheet.create({});
