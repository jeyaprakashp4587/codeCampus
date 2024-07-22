import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, pageView } from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const Post = () => {
  return (
    <LinearGradient
      colors={["#ffcccc", "white", "#cce6ff"]}
      style={{ backgroundColor: "white", flex: 1 }}
      start={[0, 1]}
      end={[1, 0]}
    >
      <Text>Post</Text>
    </LinearGradient>
  );
};

export default Post;

const styles = StyleSheet.create({});
