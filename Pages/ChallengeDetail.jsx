import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors, pageView } from "../constants/Colors";
import { useData } from "../Context/Contexter";
import HeadingText from "../utils/HeadingText";
import TopicsText from "../utils/TopicsText";
import Button from "../utils/Button";
import PragraphText from "../utils/PragraphText";

const ChallengeDetail = () => {
  const { selectedChallenge } = useData();
  //   console.log(selectedChallenge);
  const [Buttons, setButton] = useState();
  // Handle start challenge
  const HandleStart = () => {
    setButton(true);
  };
  return (
    <View style={pageView}>
      <HeadingText text="Challenge Details" />
      <ScrollView style={{ flex: 1 }}>
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
                width: "100%",
                height: 250,
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
            <View style={{ flexDirection: "row", columnGap: 17 }}>
              {selectedChallenge?.technologies.map((item, index) =>
                React.cloneElement(item.icon, { size: 25, key: index })
              )}
            </View>
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
          <View>
            {selectedChallenge?.rules.map((rule, index) => (
              <PragraphText text={["* ", rule]} fsize={15} padding={5} />
            ))}
          </View>
          {Buttons ? (
            <Button
              text="Upload"
              bgcolor="#563d7c"
              textColor="white"
              fsize={18}
            />
          ) : (
            <Button
              text="Start Challenge"
              bgcolor="#6699ff"
              textColor="white"
              fsize={18}
              function={() => HandleStart()}
            />
          )}
          <TouchableOpacity
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              borderColor: Colors.mildGrey,
            }}
          >
            <Text style={{ color: Colors.mildGrey, fontSize: 17 }}>
              How To Upload
            </Text>
          </TouchableOpacity>
        </View>
        {/* upload  projects steps */}
        {/* <View
          style={{
            width: "100%",
            borderBottomWidth: 1,
            marginTop: 20,
            borderColor: Colors.lightGrey,
            borderRadius: 20,
          }}
        />
        <View>
          <TopicsText />
        </View> */}
      </ScrollView>
    </View>
  );
};

export default ChallengeDetail;

const styles = StyleSheet.create({});
