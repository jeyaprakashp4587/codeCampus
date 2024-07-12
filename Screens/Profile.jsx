import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, pageView } from "../constants/Colors";
import HeadingText from "../utils/HeadingText";
import PragraphText from "../utils/PragraphText";
import Button from "../utils/Button";

const Profile = () => {
  return (
    <View style={pageView}>
      {/* header */}
      <View>
        <HeadingText text="Profile" />
      </View>
      {/* header */}
      {/* bg image */}
      <View>
        <Image
          source={require("../assets/images/jp.jpeg")}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            color: Colors.mildGrey,
            fontSize: 23,
            letterSpacing: 1,
            textAlign: "center",
          }}
        >
          Jeya Prakash
        </Text>
        <Text
          style={{
            color: Colors.mildGrey,
            fontSize: 20,
            letterSpacing: 1,
            textAlign: "center",
          }}
        >
          The MDT Hindu College
        </Text>
        {/* edit profile */}
        <Button
          text="Edit Profile"
          textColor="white"
          bgcolor={Colors.violet}
          fweight="700"
          width={250}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
