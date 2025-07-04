import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Colors, pageView } from "../constants/Colors";
import { useData } from "../Context/Contexter";
import HeadingText from "../utils/HeadingText";
import TopicsText from "../utils/TopicsText";
import Button from "../utils/Button";
import PragraphText from "../utils/PragraphText";
import WebView from "react-native-webview";
import axios from "axios";
import Api from "../Api";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import Ripple from "react-native-material-ripple";
import {
  getDownloadURL,
  ref,
  updateMetadata,
  uploadBytes,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../Firebase/Firebase";
import { ActivityIndicator } from "react-native";
import Skeleton from "../Skeletons/Skeleton";
import { LinearGradient } from "expo-linear-gradient";
import Actitivity from "../hooks/ActivityHook";
import { RefreshControl } from "react-native";
import { useNavigation } from "expo-router";
import moment from "moment";
import useSocket from "../Socket/useSocket";
import useSocketEmit from "../Socket/useSocketEmit";

const { width, height } = Dimensions.get("window");

const ChallengeDetail = () => {
  const { selectedChallenge, user, setUser, setSelectedChallenge } = useData();
  const navigation = useNavigation();
  const [uploadTut, setUploadTut] = useState(false);
  const [ChallengeStatus, setChallengeStatus] = useState("");
  const [statusButtonToggle, setStatusButtonToggle] = useState(false);
  const [uploadForm, setUploadForm] = useState({ GitRepo: "", LiveLink: "" });
  const [imgLoad, setImageLoad] = useState(false);
  const [images, setImages] = useState([]);
  const socket = useSocket();
  const emitEvent = useSocketEmit(socket);
  // Fetch the challenge status
  const checkChallengeStatus = useCallback(async () => {
    try {
      const res = await axios.post(
        `${Api}/Challenges/checkChallengeStatus/${user._id}`,
        {
          ChallengeName:
            selectedChallenge?.ChallengeName || selectedChallenge?.title,
        }
      );
      if (res.data == "pending" || res.data == "completed") {
        setStatusButtonToggle(true);
        setChallengeStatus(res.data);
      }
    } catch (error) {
      console.error("Error fetching challenge status:", error);
    }
  }, [selectedChallenge, user._id]);

  // Fetch a particular challenge
  const getParticularChallenge = useCallback(async () => {
    try {
      const res = await axios.post(
        `${Api}/Challenges/getParticularChallenge/${user._id}`,
        {
          ChallengeName:
            selectedChallenge?.ChallengeName || selectedChallenge?.title,
          ChallengeType:
            selectedChallenge?.ChallengeType ||
            selectedChallenge?.ChallengeType,
          ChallengeLevel:
            selectedChallenge?.ChallengeLevel || selectedChallenge?.level,
        }
      );
      if (res.data) {
        // console.log(res.data);
        setSelectedChallenge(res.data);
        checkChallengeStatus();
      }
    } catch (error) {
      console.error("Error fetching particular challenge:", error);
    }
  }, [selectedChallenge, user._id, checkChallengeStatus]);

  // Upload snapshot to Firebase
  const uploadSnap = async (imgUri) => {
    setImageLoad(true);
    try {
      const storageRef = ref(storage, `Image/${Date.now()}.jpeg`);
      const response = await fetch(imgUri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      await updateMetadata(storageRef, {
        contentType: "image/jpeg",
        cacheControl: "public,max-age=31536000",
      });
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setImageLoad(false);
    }
  };

  // Select and upload an image
  const selectSnapImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted) {
        const result = await ImagePicker.launchImageLibraryAsync({
          selectionLimit: 4,
          allowsMultipleSelection: true,
          aspect: [4, 3],
        });
        if (!result.canceled) {
          const uploadedImages = await Promise.all(
            result.assets.map(async (asset) => {
              return await uploadSnap(asset.uri);
            })
          );
          setImages((prev) => [...prev, ...uploadedImages]);
        }
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  // Handle uploading challenge details
  const HandleUpload = async () => {
    if (uploadForm.GitRepo && uploadForm.LiveLink && images) {
      try {
        const res = await axios.post(
          `${Api}/Challenges/uploadChallenge/${user._id}`,
          {
            GitRepo: uploadForm.GitRepo,
            LiveLink: uploadForm.LiveLink,
            SnapImage: images,
            ChallengeName:
              selectedChallenge?.title || selectedChallenge?.ChallengeName,
          }
        );
        if (res.data === "completed") {
          setChallengeStatus("completed");
          await handleUploadPost();
          Actitivity(
            user._id,
            `${
              selectedChallenge.title || selectedChallenge?.ChallengeName
            } Completed`
          );
        }
      } catch (error) {
        console.error("Error uploading challenge:", error);
      }
    }
  };
  // handle upload a challenge as a post
  const postText = useMemo(
    () => [
      `Thrilled to announce that I’ve just completed a challenging ${selectedChallenge?.ChallengeType} project! The task was ${selectedChallenge?.ChallengeName}. Check out the details in the link below!`,
      `Excited to share that I’ve finished a new ${selectedChallenge?.ChallengeType} challenge! It was called ${selectedChallenge?.ChallengeName}. Check out more info below!`,
      `Happy to say I’ve completed another ${selectedChallenge?.ChallengeType} project! The challenge was ${selectedChallenge?.ChallengeName}. Here’s the link to know more!`,
      `Proud to announce that I’ve finished the ${selectedChallenge?.ChallengeName} challenge, which was a ${selectedChallenge?.ChallengeType} project! Check the link below!`,
      `Just wrapped up an amazing ${selectedChallenge?.ChallengeType} project called ${selectedChallenge?.ChallengeName}! Take a look at the details below!`,
      `Completed a fantastic ${selectedChallenge?.ChallengeType} challenge today! The project was ${selectedChallenge?.ChallengeName}. Check out more below!`,
      `Feeling accomplished! I’ve just completed the ${selectedChallenge?.ChallengeType} project named ${selectedChallenge?.ChallengeName}. Have a look at the details below!`,
      `Done with another challenging ${selectedChallenge?.ChallengeType} project! It was called ${selectedChallenge?.ChallengeName}. Check the link below!`,
      `Finished a tricky ${selectedChallenge?.ChallengeType} challenge named ${selectedChallenge?.ChallengeName}. Check out the details below!`,
      `Successfully completed the ${selectedChallenge?.ChallengeName} project, which was part of a challenging ${selectedChallenge?.ChallengeType}. Check out the link below!`,
    ],
    []
  );

  const handleUploadPost = async () => {
    try {
      const res = await axios.post(`${Api}/Post/uploadPost`, {
        userId: user?._id,
        Images: images,
        postText: postText[Math.floor(Math.random() * postText.length)],
        postLink: uploadForm.LiveLink,
        Time: moment().format("YYYY-MM-DDTHH:mm:ss"),
      });

      if (res.status == 200) {
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
    }
  };
  //

  // Handle challenge start
  const HandleStart = async (chName) => {
    setStatusButtonToggle(true);
    setChallengeStatus("pending");
    try {
      const res = await axios.post(`${Api}/Challenges/addChallenge`, {
        userId: user._id,
        ChallengeName: chName,
        ChallengeType: selectedChallenge.technologies[0].name,
        ChallengeImage: selectedChallenge.sample_image,
        ChallengeLevel: selectedChallenge.level,
      });
      if (res.data) setUploadTut(true);
    } catch (error) {
      console.error("Error starting challenge:", error);
    }
  };

  // Focus listener: Fetch data when the screen comes into focus
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      getParticularChallenge();
      checkChallengeStatus();
      // console.log(selectedChallenge);
    });

    // Cleanup listener
    return unsubscribeFocus;
  }, [navigation, checkChallengeStatus, getParticularChallenge]);

  // Handle text input for challenge form
  const HandleText = (name, text) => {
    setUploadForm((prev) => ({ ...prev, [name]: text }));
  };
  const [refreshing, setRefreshing] = useState(false);
  const HandleRefresh = () => {
    setRefreshing(true);
    // console.log(selectedChallenge);
    Promise.all([getParticularChallenge()]).then((data) =>
      setRefreshing(false)
    );
  };

  // ------
  return (
    <LinearGradient
      colors={["#ffe6f0", "white", "#e6f7ff"]}
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingHorizontal: width * 0.03,
      }}
      start={[0, 1]}
      end={[1, 0]}
    >
      <HeadingText text="Challenge Details" />
      <ScrollView
        style={{ flex: 1, marginBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={() => HandleRefresh()}
            refreshing={refreshing}
          />
        }
      >
        {selectedChallenge?.sample_image || selectedChallenge?.level ? (
          <View style={{ flexDirection: "column", rowGap: 30, marginTop: 25 }}>
            {selectedChallenge?.level === "newbie" ? (
              <Text>
                We Don't have assets for{" "}
                <Text
                  style={{
                    color: "orange",
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {selectedChallenge?.level}
                </Text>{" "}
                Level Challenges
              </Text>
            ) : (
              <Image
                source={{
                  uri: selectedChallenge?.sample_image,
                }}
                style={{
                  width: width * 0.9,
                  height: height * 0.3,
                  alignSelf: "center",
                  resizeMode: "cover",
                  borderRadius: 20,
                }}
              />
            )}
            <TopicsText text={selectedChallenge?.title} fsize={20} mb={5} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  color: "orange",
                  textTransform: "capitalize",
                }}
              >
                {selectedChallenge?.level}
              </Text>
            </View>
            <View style={{ flexDirection: "row", columnGap: 20 }}>
              {selectedChallenge?.technologies?.map((i, index) => (
                <Image
                  key={index}
                  source={{ uri: i.icon }}
                  style={{
                    width: width * 0.1,
                    height: width * 0.1,
                    resizeMode: "contain",
                  }}
                />
              ))}
            </View>
            <View>
              {selectedChallenge?.rules?.map((rule, index) => (
                <PragraphText
                  key={index}
                  text={["* ", rule]}
                  fsize={15}
                  padding={5}
                />
              ))}
            </View>
            {statusButtonToggle ? (
              <Button
                text={ChallengeStatus}
                bgcolor="#563d7c"
                textColor="white"
                fsize={18}
                width="100%"
              />
            ) : (
              <Button
                text="Start Challenge"
                bgcolor="#6699ff"
                textColor="white"
                width="100%"
                fsize={18}
                function={() => HandleStart(selectedChallenge.title)}
              />
            )}
            {ChallengeStatus == "pending" && (
              <TouchableOpacity
                onPress={() => setUploadTut(!uploadTut)}
                style={{
                  // borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  alignItems: "center",
                  // borderColor: Colors.mildGrey,
                  backgroundColor: "#80bfff",
                  display: uploadTut ? "none" : "flex",
                }}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 17,
                    letterSpacing: 1,
                  }}
                >
                  How To Upload
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={{ rowGap: 20 }}>
            <Skeleton width="100%" height={height * 0.3} radius={10} />
            <Skeleton width="100%" height={height * 0.1} radius={10} />
            <Skeleton width="100%" height={height * 0.02} radius={10} />
            <Skeleton width="100%" height={height * 0.02} radius={10} />
            <Skeleton width="100%" height={height * 0.1} radius={10} />
            <Skeleton width="100%" height={height * 0.08} radius={10} />
          </View>
        )}
        {uploadTut ? (
          <View
            style={{
              paddingBottom: 20,
              marginTop: 50,
              flexDirection: "column",
              rowGap: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TopicsText text="Tutorials" mb={2} />
              <TouchableOpacity onPress={() => setUploadTut(!uploadTut)}>
                <Text
                  style={{
                    textDecorationLine: "underline",
                    letterSpacing: 1,
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TopicsText text="Step 1" mb={2} />
              <PragraphText text="* Create the account in GitHub" padding={4} />
            </View>
            <View>
              <TopicsText text="Step 2" mb={2} />
              <PragraphText
                padding={4}
                text="* Create the repository and Upload the project files into repository"
              />
              <WebView
                style={{ height: height * 0.25, width: "100%" }}
                source={{
                  html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/IUhzs7egibA?si=7o-bBQacxlyyDtyB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
                }}
              />
            </View>
            <View>
              <TopicsText text="Step 3" mb={2} />
              <PragraphText text="* Host the project in github" padding={4} />
              <WebView
                style={{ width: "100%", height: height * 0.25 }}
                source={{
                  html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/vaRxVb60cAk?si=5knicccJqCK42UUJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
                }}
              />
            </View>
            <View>
              <TopicsText text="Step 4" mb={2} />
              <PragraphText
                text="* Upload the all links and details"
                padding={2}
              />
            </View>
          </View>
        ) : null}
        {ChallengeStatus == "pending" ? (
          <View
            style={{
              marginTop: 30,
              marginBottom: 20,
              rowGap: 20,
            }}
          >
            <TextInput
              placeholder="Enter Your Project Repository"
              style={{
                borderWidth: 1,
                padding: 15,
                fontSize: 15,
                letterSpacing: 1,
                borderColor: Colors.mildGrey,
                borderRadius: 5,
              }}
              placeholderTextColor={Colors.mildGrey}
              onChangeText={(text) => HandleText("GitRepo", text)}
            />
            <TextInput
              onChangeText={(text) => HandleText("LiveLink", text)}
              placeholder="Enter Your Project LiveLink"
              style={{
                borderWidth: 1,
                padding: 15,
                fontSize: 15,
                letterSpacing: 1,
                borderColor: Colors.mildGrey,
                borderRadius: 5,
              }}
              placeholderTextColor={Colors.mildGrey}
            />
            <TouchableOpacity
              onPress={selectSnapImage}
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
                justifyContent: "center",
                borderWidth: 1,
                borderColor: Colors.mildGrey,
                borderRadius: 5,
                padding: 15,
              }}
            >
              {imgLoad ? (
                <ActivityIndicator
                  size={width * 0.05}
                  color={Colors.mildGrey}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faImage}
                  size={width * 0.05}
                  color={Colors.mildGrey}
                />
              )}
              <PragraphText text="Upload Snapshot" padding={1} fsize={15} />
            </TouchableOpacity>
            {/* show oupload image */}
            {images.length > 0
              ? images.map((item) => (
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: "100%",
                      height: height * 0.3,
                      resizeMode: "contain",
                    }}
                  />
                ))
              : null}
            {/*  */}
            <Ripple
              onPress={HandleUpload}
              style={{
                width: "100%",
                backgroundColor: "#563d7c",
                padding: 12,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  letterSpacing: 1,
                  textAlign: "center",
                }}
              >
                Upload
              </Text>
            </Ripple>
          </View>
        ) : ChallengeStatus == "completed" ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChallengeViewer");
            }}
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              columnGap: 5,
              justifyContent: "center",
              borderWidth: 1,
              borderColor: Colors.mildGrey,
              borderRadius: 5,
              padding: 10,
            }}
          >
            <Text style={{ letterSpacing: 1, fontSize: 18 }}>
              See Your Challenge
            </Text>
          </TouchableOpacity>
        ) : null}
        {/* view completed postviewer */}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  pageView: {
    ...pageView,
  },
});

export default React.memo(ChallengeDetail);
