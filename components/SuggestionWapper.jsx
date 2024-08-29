import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
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

const SuggestionWapper = () => {
  const { width, height } = Dimensions.get("window");
  return (
    <View style={{ flexDirection: "column", rowGap: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: width * 0.04,
            letterSpacing: 1,
            color: Colors.mildGrey,
          }}
        >
          Suggestions
        </Text>
        <FontAwesomeIcon icon={faTimes} size={18} color={Colors.mildGrey} />
      </View>
      {/* list */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <LinearGradient
          colors={["white", "white", "#fff5cc"]}
          style={{ elevation: 3, margin: 5, borderRadius: 5 }}
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
              columnGap: 7,
            }}
          >
            <Image
              source={{ uri: "https://i.ibb.co/10C0xJx/pr.png" }}
              style={{
                width: width * 0.15,
                height: height * 0.07,
                borderRadius: 50,
                // borderWidth: 1,
              }}
            />
            <View style={{ borderWidth: 0, flex: 1 }}>
              <Text
                style={{ fontSize: width * 0.05, color: Colors.veryDarkGrey }}
              >
                Jeya Prakash
              </Text>
              <Text style={{ fontSize: width * 0.034, color: Colors.mildGrey }}>
                The MDT Hindu College
              </Text>
            </View>
            <Ripple>
              <FontAwesomeIcon icon={faEye} color={Colors.violet} size={23} />
            </Ripple>
          </Ripple>
        </LinearGradient>
        {/*  */}
        <Ripple
          style={{
            flexDirection: "row",
            alignItems: "center",
            // borderWidth: 1,
            width: width * 0.8,
            // justifyContent: "space-between",
            height: height * 0.1,
            borderRadius: 5,
            paddingHorizontal: 15,
            columnGap: 7,
            backgroundColor: "white",
            elevation: 3,
            margin: 5,
          }}
        >
          <Image
            source={{ uri: "https://i.ibb.co/10C0xJx/pr.png" }}
            style={{
              width: width * 0.15,
              height: height * 0.07,
              borderRadius: 50,
              // borderWidth: 1,
            }}
          />
          <View style={{ borderWidth: 0, flex: 1 }}>
            <Text
              style={{ fontSize: width * 0.05, color: Colors.veryDarkGrey }}
            >
              Jeya Prakash
            </Text>
            <Text style={{ fontSize: width * 0.034, color: Colors.mildGrey }}>
              The MDT Hindu College
            </Text>
          </View>
          <Ripple>
            <FontAwesomeIcon icon={faEye} color={Colors.violet} size={23} />
          </Ripple>
        </Ripple>
      </ScrollView>
    </View>
  );
};

export default SuggestionWapper;

const styles = StyleSheet.create({});
