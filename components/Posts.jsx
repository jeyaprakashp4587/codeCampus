import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors, font } from "../constants/Colors";
import { faComment } from "@fortawesome/free-regular-svg-icons";

const Posts = () => {
  const initialText =
    "Your long paragraph goes here with more than 20 words. You can test this by adding some lorem ipsum text or any long text to see how it behaves...";
  const wordThreshold = 20;

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Function to count words in a string
  const countWords = (text) => {
    return text.trim().split(/\s+/).length;
  };
  return (
    <View
      style={{
        // borderWidth: 1,
        height: expanded ? "auto" : "auto",
        marginTop: 20,
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "white",
        marginBottom: 10,
        // margin: 10,
      }}
    >
      {/* post header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/jp.jpeg")}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <Text
            style={{
              fontSize: 18,
              color: Colors.veryDarkGrey,
              fontFamily: font.poppins,
            }}
          >
            Jeya Prakash
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: Colors.lightGrey,
              fontFamily: font.poppins,
            }}
          >
            The MDT Hindu College
          </Text>
        </View>
        <TouchableOpacity>
          <Image
            source={{ uri: "https://i.ibb.co/nn25gZN/menu.png" }}
            style={{ width: 20, height: 20, tintColor: Colors.lightGrey }}
          />
        </TouchableOpacity>
      </View>
      {/* post about */}
      <Text style={{ fontFamily: font.poppins, fontSize: 13, marginTop: 10 }}>
        {expanded
          ? initialText
          : `${initialText.split(" ").slice(0, wordThreshold).join(" ")}...`}
      </Text>
      {countWords(initialText) > wordThreshold && (
        <TouchableOpacity onPress={toggleExpanded} style={styles.showMore}>
          <Text style={{ color: "#595959" }}>
            {expanded ? "Show less" : "Show more"}
          </Text>
        </TouchableOpacity>
      )}
      {/* post image */}
      <Image
        source={require("../assets/images/post.jpg")}
        style={{
          width: "100%",
          height: 300,
          resizeMode: "center",
        }}
      />
      {/* post details */}
      <View
        style={{
          paddingBottom: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomColor: Colors.veryLightGrey,
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ fontFamily: font.poppins, fontSize: 13 }}>
          You and 11 others
        </Text>
        <Text style={{ fontFamily: font.poppins, fontSize: 13 }}>
          +31 Comments
        </Text>
      </View>
      {/* post sections */}
      <View
        style={{
          // borderWidth: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 5,
          paddingTop: 10,
        }}
      >
        <Image
          source={require("../assets/images/like.png")}
          style={{ width: 25, height: 25, tintColor: Colors.lightGrey }}
        />
        <Image
          source={require("../assets/images/chat.png")}
          style={{ width: 25, height: 25, tintColor: Colors.lightGrey }}
        />
        <Image
          source={require("../assets/images/share.png")}
          style={{ width: 25, height: 25, tintColor: Colors.lightGrey }}
        />
        <Image
          source={require("../assets/images/save.png")}
          style={{ width: 25, height: 25, tintColor: Colors.lightGrey }}
        />
      </View>
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({});
