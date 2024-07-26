import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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

const Post = () => {
  const { user } = useData();
  const { width, height } = Dimensions.get("window");
  const postText = useRef(null);
  const postLink = useRef(null);
  const handlePostText = (text) => {
    postText.current = text;
  };
  const handlePostLink = (text) => {
    postLink.current = text;
  };
  // pick images
  useEffect(() => {
    const permission = ImagePicker.requestMediaLibraryPermissionsAsync();
  }, []);
  // select images
  const [Images, setImages] = useState([]);
  const [hostImageIndi, setHostImageIndi] = useState(false);
  const selectImage = async () => {
    setHostImageIndi(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      selectionLimit: 4,
      allowsMultipleSelection: true,
      aspect: [4, 3],
    });
    if (result) {
      result.assets.map((asset) => {
        hostImage(asset.uri).then((d) => {
          setHostImageIndi(true), setImages((prev) => [...prev, d]);
        });
      });
    }
  };
  // upload Image
  const hostImage = async (images) => {
    try {
      const storageRef = ref(storage, "Image/" + Date.now() + ".jpeg");
      const response = await fetch(images);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      await updateMetadata(storageRef, {
        contentType: "image/jpeg",
        cacheControl: "public,max-age=31536000",
      });
      const downloadURL = await getDownloadURL(storageRef);
      // console.log("url", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };
  // upload post
  const [uploadText, setUploadText] = useState("Upload");
  const [uploadIndi, setUploadIndi] = useState(false);
  const HandleUpload = async () => {
    setUploadIndi(true);
    console.log(postLink.current, postText.current);
    const res = await axios.post(`${Api}/Post/UploadPost`, {
      userId: user._id,
      Images: Images,
      postText: postText.current,
      postLink: postLink.current,
    });

    console.log(res.data);
    if (res.data == "Uploaded") {
      setUploadText("Uploaded");
      setUploadIndi(false);
      setImages([]);
      postLink.current = "";
      postText.current = "";
    }
  };
  return (
    <View style={[pageView, { rowGap: 10 }]}>
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
            onChangeText={handlePostText}
          />
          <TextInput
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
          {Images?.length > 0 ? (
            Images?.map((img, index) => (
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
          onPress={HandleUpload}
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
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({});
