import {
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, pageView } from "../constants/Colors";
import HeadingText from "../utils/HeadingText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faAward, faBook, faSignOut } from "@fortawesome/free-solid-svg-icons";
import HrLine from "../utils/HrLine";
import Post from "../components/Posts";
import TopicsText from "../utils/TopicsText";
import { useData } from "../Context/Contexter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Imagepicker from "expo-image-picker";
import { storage } from "../Firebase/Firebase";
import {
  getDownloadURL,
  ref,
  updateMetadata,
  uploadBytes,
} from "firebase/storage";
import axios from "axios";
import Api from "../Api";
import Skeleton from "../Skeletons/Skeleton";

const Profile = ({ navigation }) => {
  const { user, setUser } = useData();

  // get permission for image picker
  const ImagePermission = async () => {
    const permission = await Imagepicker.requestMediaLibraryPermissionsAsync();
    const grand = await Imagepicker.getMediaLibraryPermissionsAsync();
  };
  useEffect(() => {
    ImagePermission();
  }, []);
  // host the image to firebase storage bucket
  const [uploadIndicator, setUploadIndicator] = useState(false);
  const hostImage = async (imageUri, imageType) => {
    try {
      setUploadIndicator(imageType);
      const storageRef = ref(storage, "Image/" + Date.now() + ".jpeg");
      const response = await fetch(imageUri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      await updateMetadata(storageRef, {
        contentType: "image/jpeg",
        cacheControl: "public,max-age=31536000",
      });
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };
  // change profile picture
  const HandleChangeProfile = async (imageType) => {
    const result = await Imagepicker.launchImageLibraryAsync({
      mediaTypes: Imagepicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: imageType == "profile" ? [4, 4] : [9, 6],
      quality: 1,
    });
    if (result.assets[0].uri) {
      hostImage(result.assets[0].uri, imageType).then((imageuri) => {
        upload(imageuri, imageType);
      });

      // console.log(result.assets[0].uri);
    }
  };
  // upload to server
  const upload = async (ImageUrl, ImageType) => {
    const res = await axios.post(`${Api}/Profile/updateProfileImages`, {
      ImageUri: ImageUrl,
      ImageType: ImageType,
      userId: user._id,
    });
    if (res.data.Email) {
      setUser(res.data);
      setUploadIndicator(false);
    }
  };
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
        <TouchableOpacity
          onPress={() => HandleChangeProfile("cover")}
          style={{ position: "absolute", right: 20, top: 10, zIndex: 10 }}
        >
          <FontAwesomeIcon icon={faEdit} size={20} color="orange" />
        </TouchableOpacity>
        {uploadIndicator === "cover" ? (
          <Skeleton width="100%" height={240} radius={10} mt={1} />
        ) : (
          <Image
            source={{
              uri: user?.Images.coverImg,
            }}
            style={{ width: "100%", height: 240, objectFit: "fill" }}
          />
        )}

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
          <TouchableOpacity
            onPress={() => HandleChangeProfile("profile")}
            style={{ position: "absolute", left: 100, top: 70, zIndex: 10 }}
          >
            <FontAwesomeIcon icon={faEdit} size={20} color="orange" />
          </TouchableOpacity>
          {uploadIndicator === "profileLoad" ? (
            <Skeleton width={100} height={100} radius={50} mt={1} />
          ) : (
            <Image
              source={{
                uri: user?.Images.profile
                  ? user?.Images.profile
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
          )}
          {/* edit icon */}
          <TouchableOpacity
            style={{ position: "absolute", right: 20, top: 70 }}
          >
            <FontAwesomeIcon icon={faEdit} size={20} />
          </TouchableOpacity>
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
