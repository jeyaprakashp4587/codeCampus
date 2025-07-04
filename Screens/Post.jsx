import {
  Alert,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Colors, pageView } from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import HeadingText from "../utils/HeadingText";
import { useData } from "../Context/Contexter";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import * as ImagePicker from "expo-image-picker";
import { FlatList } from "react-native";
import Ripple from "react-native-material-ripple";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { ActivityIndicator } from "react-native";
import {
  getDownloadURL,
  ref,
  updateMetadata,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../Firebase/Firebase";
import axios from "axios";
import Api from "../Api";
import { useRef } from "react";
import Actitivity from "../hooks/ActivityHook";
import moment from "moment";
import useSocketEmit from "../Socket/useSocketEmit";
import useSocket from "../Socket/useSocket";
import { useSocketContext } from "../Socket/SocketContext";

const Post = () => {
  const { user } = useData();
  const { width, height } = Dimensions.get("window");
  const postText = useRef("");
  const postLink = useRef("");
  const inputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [uploadText, setUploadText] = useState("Upload");
  const [uploadIndi, setUploadIndi] = useState(false);
  const [refreshCon, setRefreshCon] = useState(false);
  const [hostImageIndi, setHostImageIndi] = useState(false);
  const socket = useSocketContext();

  const emitEvent = useSocketEmit(socket);

  const handlePostText = (text) => {
    postText.current = text;
  };

  const handlePostLink = (text) => {
    postLink.current = text;
  };

  // Request media library permissions
  useEffect(() => {
    const requestPermissions = async () => {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    };
    requestPermissions();
  }, []);

  // Select images from the library
  const selectImage = async () => {
    setHostImageIndi(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      selectionLimit: 4,
      allowsMultipleSelection: true,
      aspect: [4, 3],
    });

    if (result?.assets) {
      const uploadedImages = await Promise.all(
        result.assets.map(async (asset) => {
          return await hostImage(asset.uri);
        })
      );
      setImages((prev) => [...prev, ...uploadedImages]);
      setHostImageIndi(true);
    }
  };

  // Upload image to Firebase
  const hostImage = useCallback(async (imageUri) => {
    try {
      const storageRef = ref(storage, `Image/${Date.now()}.jpeg`);
      const response = await fetch(imageUri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      await updateMetadata(storageRef, {
        contentType: "image/jpeg",
        cacheControl: "public,max-age=31536000",
      });
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }, []);

  // Handle post upload
  const handleUpload = async () => {
    setUploadIndi(true);
    if (postLink.current && postText.current) {
      try {
        const res = await axios.post(`${Api}/Post/uploadPost`, {
          userId: user?._id,
          Images: images,
          postText: postText.current,
          postLink: postLink.current,
          Time: moment().format("YYYY-MM-DDTHH:mm:ss"),
        });

        if (res.status == 200) {
          setUploadText("Uploaded");
          // console.log(res.data);
          emitEvent("PostNotiToConnections", {
            Time: moment().format("YYYY-MM-DDTHH:mm:ss"),
            postId: res.data?.postId,
          });
          Alert.alert("Uploaded Successfully");
          refreshFields();
        } else {
          Alert.alert("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error(
          "Upload error:",
          error.response ? error.response.data : error.message
        );
        Alert.alert("Upload failed. Please check your connection.");
      } finally {
        setUploadIndi(false);
      }
    } else {
      Alert.alert("Please fill in all fields.");
      setUploadIndi(false);
    }
  };

  // Refresh input fields
  const refreshFields = () => {
    setRefreshCon(true);
    inputRef.current.clear();
    setImages([]);
    setUploadText("Upload");
    setTimeout(() => {
      setRefreshCon(false);
    }, 1000);
  };
  //  --------------- //
  return (
    <ScrollView
      style={[pageView, { rowGap: 10 }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshCon}
          onRefresh={() => refreshFields()}
        />
      }
    >
      {/* heading Text */}
      <HeadingText text="Post" />
      {/* profile */}
      <View
        style={{ flexDirection: "row", alignItems: "center", columnGap: 20 }}
      >
        <Image
          source={{
            uri: user?.Images?.profile
              ? user?.Images?.profile
              : user.Gender == "Male"
              ? "https://i.ibb.co/3T4mNMm/man.png"
              : "https://i.ibb.co/3mCcQp9/woman.png",
          }}
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
      {/* inputs wrapper */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ rowGap: 30 }}>
          <TextInput
            placeholder="Type Something..."
            style={{
              color: Colors.mildGrey,
              borderBottomWidth: 1,
              padding: 10,
              borderColor: Colors.lightGrey,
              letterSpacing: 1,
            }}
            ref={inputRef}
            onChangeText={handlePostText}
          />
          <TextInput
            ref={inputRef}
            placeholder="Share Links"
            onChangeText={handlePostLink}
            style={{
              color: Colors.mildGrey,
              borderBottomWidth: 1,
              letterSpacing: 1,
              padding: 10,
              borderColor: Colors.lightGrey,
            }}
          />
          <TouchableOpacity
            onPress={selectImage}
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
              backgroundColor: Colors.violet,
              justifyContent: "center",
              height: height * 0.06,
              borderRadius: 10,
            }}
          >
            <FontAwesomeIcon
              icon={faImage}
              size={width * 0.05}
              color={Colors.white}
            />
            <Text
              style={{
                fontSize: width * 0.035,
                color: Colors.white,
                letterSpacing: 1,
                fontWeight: "700",
              }}
            >
              Select Image or Video
            </Text>
          </TouchableOpacity>
        </View>
        {/* show selected images  */}
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{
            // borderWidth: 1,
            height: "auto",
            marginTop: 20,
          }}
        >
          {images?.length > 0 ? (
            images?.map((img, index) => (
              <View
                style={{
                  width: width * 0.5,
                  height: height * 0.3,
                  marginLeft: 10,
                }}
                key={index}
              >
                <Image
                  source={{ uri: img }}
                  style={{
                    width: width * 0.5,
                    height: height * 0.3,
                    borderRadius: 10,
                  }}
                />
                {/* layer */}
              </View>
            ))
          ) : (
            <View
              style={{
                display: hostImageIndi ? "none" : "flex",
                backgroundColor: "white",
                width: "100%",
                height: "100%",
                position: "absolute",
                // borderWidth: 1,
                opacity: 0.5,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size={50} color={Colors.mildGrey} />
            </View>
          )}
        </ScrollView>
        {/* post Button */}
        <Ripple
          onPress={handleUpload}
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 10,
            backgroundColor: Colors.violet,
            justifyContent: "center",
            height: height * 0.06,
            borderRadius: 10,
            marginTop: 20,
            marginBottom: 50,
          }}
        >
          <ActivityIndicator
            size={30}
            color={Colors.white}
            style={{ display: uploadIndi ? "flex" : "none" }}
          />
          <Text
            style={{
              fontSize: width * 0.035,
              color: Colors.white,
              letterSpacing: 1,
              fontWeight: "700",
            }}
          >
            {uploadText}
          </Text>
        </Ripple>
      </ScrollView>
    </ScrollView>
  );
};

export default React.memo(Post);

const styles = StyleSheet.create({});
