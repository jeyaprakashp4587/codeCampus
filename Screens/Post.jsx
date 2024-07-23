import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors, pageView } from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import HeadingText from "../utils/HeadingText";
import { useData } from "../Context/Contexter";

const Post = () => {
  const { user } = useData();
  const { width, height } = Dimensions.get("window");
  return (
    <View style={pageView}>
      {/* heading Text */}
      <HeadingText text="Post" />
      {/* profile */}
      <View
        style={{ flexDirection: "row", alignItems: "center", columnGap: 20 }}
      >
        <Image
          source={{ uri: user.Images.profile }}
          style={{ width: 60, height: 60, borderRadius: 50 }}
        />
        <Text
          style={{
            fontSize: width * 0.051,
            letterSpacing: 1,
            color: Colors.mildGrey,
          }}
        >
          {user?.firstName} {user?.LastName}
        </Text>
      </View>
      {/* text */}
      <Text
        style={{
          fontSize: width * 0.033,
          textAlign: "center",
          letterSpacing: 1,
          color: Colors.lightGrey,
          paddingVertical: 20,
        }}
      >
        ShowCase your Achivement to the World
      </Text>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({});
