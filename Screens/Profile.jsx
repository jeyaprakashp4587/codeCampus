import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { Colors, pageView } from "../constants/Colors";
import HeadingText from "../utils/HeadingText";
import PragraphText from "../utils/PragraphText";
import Button from "../utils/Button";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { TouchableOpacity } from "react-native";
import { faAward, faBook, faSignOut } from "@fortawesome/free-solid-svg-icons";
import HrLine from "../utils/HrLine";
import Post from "../components/Posts";
import TopicsText from "../utils/TopicsText";
import { useData } from "../Context/Contexter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Imagepicker from "expo-image-picker";

const Profile = ({ navigation }) => {
  const { user } = useData();

  // get permission for image picker
  const ImagePermission = async () => {
    const permission = await Imagepicker.requestMediaLibraryPermissionsAsync();
    const grand = await Imagepicker.getMediaLibraryPermissionsAsync();
    console.log(grand);
  };
  useEffect(() => {
    ImagePermission();
  }, []);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      {/* header */}
      <View style={{ paddingHorizontal: 20 }}>
        <HeadingText text="Profile" />
      </View>
      {/* header */}
      {/* about*/}
      <View style={{ borderWidth: 0 }}>
        {/* this icon for cover */}
        <Pressable
          style={{ position: "absolute", right: 20, top: 10, zIndex: 10 }}
        >
          <FontAwesomeIcon icon={faEdit} size={20} color="orange" />
        </Pressable>
        <Image
          source={{
            uri: "https://i.ibb.co/YBfJxF3/60750.jpg",
          }}
          style={{ width: "100%", height: 200, objectFit: "fill" }}
        />
        <View
          style={{
            // borderWidth: 1,
            // position: "absolute",
            top: -50,
            width: "100%",
            flexDirection: "column",
            rowGap: 5,
            justifyContent: "flex-start",
            paddingHorizontal: 20,
          }}
        >
          {/* this icon for profile */}
          <Pressable
            style={{ position: "absolute", left: 100, top: 70, zIndex: 10 }}
          >
            <FontAwesomeIcon icon={faEdit} size={20} color="orange" />
          </Pressable>
          <Image
            // source={require("../assets/images/jp.jpeg")}
            source={{
              uri: user?.profile
                ? user.profile
                : user.Gender == "Male"
                ? "https://i.ibb.co/3T4mNMm/man.png"
                : "https://i.ibb.co/3mCcQp9/woman.png",
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              // alignSelf: "center",
              borderColor: "white",
              borderWidth: 5,
              objectFit: "cover",
            }}
          />
          {/* edit icon */}
          <Pressable style={{ position: "absolute", right: 20, top: 70 }}>
            <FontAwesomeIcon icon={faEdit} size={20} />
          </Pressable>
          <Text
            style={{
              color: Colors.veryDarkGrey,
              fontSize: 23,
              letterSpacing: 1,
              // textAlign: "center",
              // fontWeight: "700",
            }}
          >
            {user?.firstName} {user.LastName}
          </Text>
          <Text
            style={{
              color: Colors.mildGrey,
              fontSize: 17,
              letterSpacing: 1,
              // textAlign: "center",
            }}
          >
            {user?.bio ? user.bio : "I want to become an Winner"}
          </Text>
          <View style={{ height: 5 }} />
          <Text
            style={{
              color: Colors.veryDarkGrey,
              fontSize: 15,
              letterSpacing: 1,
              // textAlign: "center",
            }}
          >
            {user?.InstitudeName}
          </Text>
          <Text
            style={{
              color: Colors.mildGrey,
              fontSize: 15,
              letterSpacing: 1,
              // textAlign: "center",
            }}
          >
            {user?.District}, {user?.State}
          </Text>
        </View>
      </View>
      {/* following */}
      <View
        style={{
          // borderWidth: 1,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: "600",
              color: Colors.mildGrey,
              letterSpacing: 1,
            }}
          >
            Followers
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: Colors.mildGrey,
              fontSize: 15,
              letterSpacing: 1,
            }}
          >
            203
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontWeight: "600",
              color: Colors.mildGrey,
              letterSpacing: 1,
            }}
          >
            Following
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: Colors.mildGrey,
              fontSize: 15,
              letterSpacing: 1,
            }}
          >
            184
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontWeight: "600",
              color: Colors.mildGrey,
              letterSpacing: 1,
            }}
          >
            Posts
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: Colors.mildGrey,
              fontSize: 15,
              letterSpacing: 1,
            }}
          >
            0
          </Text>
        </View>
      </View>
      {/* bar */}
      <HrLine />
      {/* options */}
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 10,
          flexDirection: "column",
          rowGap: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Colors.veryLightGrey,
            padding: 15,
            borderRadius: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: Colors.violet,
              fontWeight: "600",
              letterSpacing: 1,
              fontSize: 16,
            }}
          >
            Courses
          </Text>
          <FontAwesomeIcon icon={faBook} size={20} color={Colors.violet} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.veryLightGrey,
            padding: 15,
            borderRadius: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "#595959",
              fontWeight: "600",
              letterSpacing: 1,
              fontSize: 16,
            }}
          >
            Rewards
          </Text>
          <FontAwesomeIcon icon={faAward} size={20} color="#595959" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.removeItem("Email");
            navigation.navigate("login");
          }}
          style={{
            backgroundColor: Colors.veryLightGrey,
            padding: 15,
            borderRadius: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "#ffaa80",
              fontWeight: "600",
              letterSpacing: 1,
              fontSize: 16,
            }}
          >
            Log out
          </Text>
          <FontAwesomeIcon icon={faSignOut} size={20} color="#ffaa80" />
        </TouchableOpacity>
      </View>
      {/* posts */}
      <HrLine />
      <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TopicsText text="Posts" mb={1} />
          <TouchableOpacity>
            <Text
              style={{
                color: Colors.mildGrey,
                textDecorationLine: "underline",
              }}
            >
              Show More
            </Text>
          </TouchableOpacity>
        </View>
        <Post />
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
//
//
