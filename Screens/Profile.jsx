import {
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import { Button } from "react-native-paper";
import { Dimensions } from "react-native";
import { RefreshControl } from "react-native";
import Posts from "../components/Posts";

const Profile = ({ navigation }) => {
  const { user, setUser } = useData();
  const { width, height } = Dimensions.get("window");

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
    setUploadIndicator(imageType);
    try {
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
      hostImage(result.assets[0].uri, imageType)
        .then((imageuri) => {
          upload(imageuri, imageType);
        })
        .catch((err) => setUploadIndicator(false));
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
  // update user names and bio
  const [aboutUpdate, setAboutUpdate] = useState(false);
  const [uploadActivityIndi, setUploadActivityIndi] = useState(false);
  const about = useRef({
    FirstName: "",
    LastName: "",
    Bio: "",
  }).current;
  const HandleAboutInput = (name, text) => {
    about[name] = text;
    // console.log(about.Bio);
  };
  const HandleUpdate = async () => {
    setUploadActivityIndi(!uploadActivityIndi);
    const res = await axios.post(
      `${Api}/Profile/updateProfileData/${user._id}`,
      { FirstName: about.FirstName, LastName: about.LastName, Bio: about.Bio }
    );
    if (res.data.Email) {
      setUser(res.data);
      setAboutUpdate(!aboutUpdate);
      setUploadActivityIndi(false);
    }
  };
  // refresh page
  const [refControl, setRefControl] = useState(false);
  const refreshUser = async () => {
    setUploadActivityIndi(false);
    setUploadIndicator(false);
    setRefControl(true);
    const res = await axios.post(`${Api}/Login/getUser`, { userId: user._id });
    if (res.data) {
      setUser(res.data);
      setRefControl(false);
    }
  };
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refControl} onRefresh={refreshUser} />
      }
    >
      {/* Header */}
      <View style={{ paddingHorizontal: width * 0.05 }}>
        <HeadingText text="Profile" />
      </View>

      {/* About Section */}
      <View style={{ borderWidth: 0 }}>
        {/* Cover Photo Edit Icon */}
        <TouchableOpacity
          onPress={() => HandleChangeProfile("cover")}
          style={{
            position: "absolute",
            right: width * 0.05,
            top: height * 0.03,
            zIndex: 10,
          }}
        >
          <FontAwesomeIcon icon={faEdit} size={20} color="orange" />
        </TouchableOpacity>
        {uploadIndicator === "cover" ? (
          <Skeleton width="100%" height={200} radius={10} mt={1} />
        ) : (
          <Image
            source={{
              uri: user?.Images?.coverImg
                ? user?.Images?.coverImg
                : "https://i.ibb.co/wwGDt0t/2151133955.jpg",
            }}
            style={{
              width: "100%",
              height: height * 0.27,
              resizeMode: "cover",
            }}
          />
        )}

        <View
          style={{
            top: -50,
            width: "100%",
            flexDirection: "column",
            rowGap: 5,
            justifyContent: "flex-start",
            paddingHorizontal: width * 0.05,
          }}
        >
          {/* Profile Photo Edit Icon */}
          <TouchableOpacity
            onPress={() => HandleChangeProfile("profile")}
            style={{
              position: "absolute",
              left: width * 0.23,
              top: height * 0.099,
              zIndex: 10,
            }}
          >
            <FontAwesomeIcon icon={faEdit} size={20} color="orange" />
          </TouchableOpacity>
          {uploadIndicator === "profile" ? (
            <Skeleton width={100} height={100} radius={50} mt={1} />
          ) : (
            <Image
              source={{
                uri: user?.Images?.profile
                  ? user?.Images?.profile
                  : user.Gender === "Male"
                  ? "https://i.ibb.co/3T4mNMm/man.png"
                  : "https://i.ibb.co/3mCcQp9/woman.png",
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderColor: "white",
                borderWidth: 5,
                resizeMode: "cover",
              }}
            />
          )}
          {/* About Edit Icon */}
          <TouchableOpacity
            onPress={() => setAboutUpdate(!aboutUpdate)}
            style={{
              position: "absolute",
              right: width * 0.05,
              top: height * 0.08,
            }}
          >
            <FontAwesomeIcon icon={faEdit} size={20} />
          </TouchableOpacity>

          {/* User Name and Bio */}
          <Text
            style={{
              color: Colors.veryDarkGrey,
              fontSize: width * 0.06,
              letterSpacing: 1,
            }}
          >
            {user?.firstName} {user.LastName}
          </Text>
          <Text
            style={{
              color: Colors.mildGrey,
              fontSize: width * 0.04,
              letterSpacing: 1,
            }}
          >
            {user?.Bio ? user.Bio : "I want to become a Winner"}
          </Text>
          {/* Update User Info Modal */}
          {aboutUpdate && (
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.mildGrey,
                width: "100%",
                height: 300,
                position: "absolute",
                alignSelf: "center",
                backgroundColor: "white",
                zIndex: 10,
                top: height * 0.2,
                borderRadius: 10,
                padding: 20,
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <ActivityIndicator
                size={60}
                color={Colors.violet}
                style={{
                  position: "absolute",
                  zIndex: 90,
                  alignSelf: "center",
                  top: "50%",
                  display: uploadActivityIndi ? "flex" : "none",
                }}
              />
              <TextInput
                placeholder="First Name"
                style={{
                  borderRadius: 3,
                  borderWidth: 1,
                  padding: 10,
                  borderColor: Colors.veryLightGrey,
                  color: Colors.mildGrey,
                  letterSpacing: 1,
                  opacity: uploadActivityIndi ? 0.3 : 1,
                  paddingHorizontal: 15,
                }}
                onChangeText={(text) => HandleAboutInput("FirstName", text)}
              />
              <TextInput
                placeholder="Last Name"
                style={{
                  borderRadius: 3,
                  borderWidth: 1,
                  padding: 10,
                  borderColor: Colors.veryLightGrey,
                  color: Colors.mildGrey,
                  letterSpacing: 1,
                  opacity: uploadActivityIndi ? 0.3 : 1,
                  paddingHorizontal: 15,
                }}
                onChangeText={(text) => HandleAboutInput("LastName", text)}
              />
              <TextInput
                placeholder="Bio"
                style={{
                  borderRadius: 3,
                  borderWidth: 1,
                  padding: 10,
                  paddingHorizontal: 15,
                  borderColor: Colors.veryLightGrey,
                  color: Colors.mildGrey,
                  letterSpacing: 1,
                  opacity: uploadActivityIndi ? 0.3 : 1,
                }}
                onChangeText={(text) => HandleAboutInput("Bio", text)}
              />
              <Button
                onPress={() => HandleUpdate()}
                style={{
                  backgroundColor: Colors.violet,
                  borderRadius: 5,
                  padding: 8,
                }}
                textColor="white"
              >
                Update
              </Button>
            </View>
          )}

          {/* Institute Name and Location */}
          <View style={{ height: 5 }} />
          <Text
            style={{
              color: Colors.veryDarkGrey,
              fontSize: width * 0.04,
              letterSpacing: 1,
            }}
          >
            {user?.InstitudeName}
          </Text>
          <Text
            style={{
              color: Colors.mildGrey,
              fontSize: width * 0.04,
              letterSpacing: 1,
            }}
          >
            {user?.District}, {user?.State}
          </Text>
        </View>
      </View>

      {/* Following Info */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: height * -0.02,
          marginBottom: 5,
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
            Networks
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: Colors.mildGrey,
              fontSize: width * 0.04,
              letterSpacing: 1,
            }}
          >
            {user?.Connections?.length}
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
              fontSize: width * 0.04,
              letterSpacing: 1,
            }}
          >
            {user?.Posts?.length}
          </Text>
        </View>
      </View>
      <HrLine />
      {/* Category Cards */}
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          rowGap: 10,
          marginVertical: 10,
          marginBottom: 50,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("yourcourse")}
          style={{
            backgroundColor: Colors.veryLightGrey,
            padding: 15,
            borderRadius: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            width: width * 0.9,
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
            width: width * 0.9,
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
            width: width * 0.9,
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
      <View style={{ paddingHorizontal: 20 }}>
        <TopicsText text={user?.Posts.length > 0 ? "Posts" : "s"} />
        {user?.Posts.map((post, index) => (
          <Posts post={post} index={index} admin={true} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
//
//
