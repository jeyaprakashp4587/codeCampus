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
import React, { useState } from "react";
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

const { width, height } = Dimensions.get("window");

const ChallengeDetail = () => {
  const { selectedChallenge, user, setUser } = useData();
  const [Buttons, setButton] = useState();
  const [uploadTut, setUploadTut] = useState();
  const [uploadStatus, setUploadStatus] = useState();

  const HandleStart = async (chName) => {
    setButton(true);
    const res = await axios.post(`${Api}/Challenges/addChallenge`, {
      userId: user._id,
      ChallengeName: chName,
      ChallengeType: selectedChallenge.technologies[0].name,
    });
  };

  const [uploadForm, setUploadForm] = useState({
    GitRepo: "",
    LiveLink: "",
  });
  const HandleText = (name, text) => {
    setUploadForm({ ...uploadForm, [name]: text });
  };
  const HandleUpload = async (e) => {
    setUploadStatus("Uploaded");
    const res = await axios.post(`${Api}/Challenges/uploadChallenge`, {
      GiteRepo: uploadForm.GitRepo,
      LiveLink: uploadForm.LiveLink,
    });
  };

  return (
    <View style={[styles.pageView, { paddingVertical: 20 }]}>
      <HeadingText text="Challenge Details" />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
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
          <TopicsText text={selectedChallenge?.title} fszie={20} mb={5} />
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
            {selectedChallenge?.technologies.map((i, index) => (
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
            {selectedChallenge?.rules.map((rule, index) => (
              <PragraphText
                key={index}
                text={["* ", rule]}
                fsize={15}
                padding={5}
              />
            ))}
          </View>
          <Image />
          {Buttons ? (
            <Button
              text={
                uploadStatus == "open"
                  ? "Wait..."
                  : uploadStatus == "Uploaded"
                  ? "Uploaded"
                  : "Upload"
              }
              bgcolor="#563d7c"
              textColor="white"
              fsize={18}
              width="100%"
              function={() => setUploadStatus("open")}
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
          <TouchableOpacity
            onPress={() => setUploadTut(!uploadTut)}
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              borderColor: Colors.mildGrey,
              display: uploadTut ? "none" : "flex",
            }}
          >
            <Text
              style={{
                color: Colors.mildGrey,
                fontSize: 17,
              }}
            >
              How To Upload
            </Text>
          </TouchableOpacity>
        </View>
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
                  style={{ textDecorationLine: "underline", letterSpacing: 1 }}
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
        {uploadStatus == "open" ? (
          <View
            style={{
              marginTop: 30,
              height: height * 0.5,
              marginBottom: 20,
              rowGap: 20,
            }}
          >
            <TextInput
              placeholder="Enter Your Project Repository"
              style={{
                borderWidth: 1,
                padding: 15,
                fontSize: 17,
                letterSpacing: 1,
                borderColor: Colors.mildGrey,
                borderRadius: 5,
              }}
              placeholderTextColor={Colors.mildGrey}
              onChangeText={(text) => HandleText("GitRepo", text)}
            />
            <TextInput
              onChangeText={(text) => HandleText("LiveLink", text)}
              placeholder="Enter Your Project Repository"
              style={{
                borderWidth: 1,
                padding: 15,
                fontSize: 17,
                letterSpacing: 1,
                borderColor: Colors.mildGrey,
                borderRadius: 5,
              }}
              placeholderTextColor={Colors.mildGrey}
            />
            <TouchableOpacity
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
              <FontAwesomeIcon
                icon={faImage}
                size={width * 0.05}
                color={Colors.mildGrey}
              />
              <PragraphText text="Upload Snapshot" padding={1} />
            </TouchableOpacity>

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
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageView: {
    ...pageView,
  },
});

export default ChallengeDetail;
