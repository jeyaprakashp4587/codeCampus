import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import Ripple from "react-native-material-ripple";
import { ScrollView } from "react-native";
import { Colors, pageView } from "../constants/Colors";
import HeadingText from "../utils/HeadingText";
import HrLine from "../utils/HrLine";
import Api from "../Api";
import axios from "axios";
import { useData } from "../Context/Contexter";
const { width, height } = Dimensions.get("window");
import ParagraphText from "../utils/PragraphText";
import { Feather } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Skeleton from "../Skeletons/Skeleton";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const YourChallenges = (props) => {
  const navigation = useNavigation();
  const { setSelectedChallenge } = useData();
  const { width, height } = Dimensions.get("window");
  const { user } = useData();
  const [challenges, setChallenges] = useState();
  const [skLoad, setSkLoad] = useState();
  //   fetch chllenges from DB
  const getChallenges = async (option) => {
    const res = await axios.post(
      `${Api}/Challenges/getUserChallege/${user._id}`,
      {
        option: option,
      }
    );
    // console.log(res.data);
    if (res.data) {
      setChallenges(res.data);
      setSkLoad(true);
    }
  };
  // console.log("challenges", challenges);
  useEffect(() => {
    getChallenges("All");
  }, []);
  // handle operations
  const HandleOption = (option) => {
    setSkLoad(false);
    getChallenges(option);
  };
  return (
    <View style={[pageView, { borderWidth: 0 }]}>
      {/* header options */}
      <HeadingText text="Your Challenges" mb={1} />
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          //   borderWidth: 1,
          height: height * 0.05,
          marginBottom: 5,
          marginHorizontal: 5,
          columnGap: 20,
        }}
      >
        <Ripple
          onPress={() => HandleOption("All")}
          style={{
            padding: 10,
            elevation: 3,
            // borderWidth: 1,
            backgroundColor: "white",
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: width * 0.03,
              letterSpacing: 1,
            }}
          >
            All Challenges
          </Text>
        </Ripple>
        <Ripple
          onPress={() => HandleOption("Complete")}
          style={{
            padding: 10,
            elevation: 3,
            // borderWidth: 1,
            backgroundColor: "white",
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: width * 0.03,
              letterSpacing: 1,
            }}
          >
            Completed
          </Text>
        </Ripple>
        <Ripple
          onPress={() => HandleOption("Pending")}
          style={{
            padding: 10,
            elevation: 3,
            backgroundColor: "white",
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: width * 0.03,
              letterSpacing: 1,
            }}
          >
            In Progress
          </Text>
        </Ripple>
      </View>
      <HrLine width="100%" />
      {/* list challenges */}

      {challenges?.length <= 0 ? (
        !skLoad ? (
          <View style={{ rowGap: 10 }}>
            <Skeleton width="100%" height={200} radius={10} />
            <Skeleton width="100%" height={200} radius={10} />
            <Skeleton width="100%" height={200} radius={10} />
            <Skeleton width="100%" height={200} radius={10} />
            <Skeleton width="100%" height={200} radius={10} />
          </View>
        ) : (
          <Text style={{ fontSize: 20, letterSpacing: 1 }}>
            Nothing Is There!
          </Text>
        )
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={challenges}
          style={{ borderWidth: 0 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedChallenge(item);
                navigation.navigate("challengeDetail");
              }}
              style={styles.challengeContainer}
              key={index}
            >
              <View style={styles.challengeHeader}>
                <ParagraphText
                  text={item?.ChallengeName}
                  fsize={height * 0.021}
                  padding={5}
                  widht="70%"
                />
                <ParagraphText
                  text={
                    item?.ChallengeLevel
                      ? item?.ChallengeLevel
                      : item?.ChallengeLevel
                  }
                  fsize={height * 0.017}
                  padding={5}
                  color="orange"
                />
              </View>
              {item?.ChallengeLevel !== "newbie" && (
                <Image
                  source={{ uri: item.ChallengeImage }}
                  style={styles.challengeImage}
                />
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: height * 0.018,
                    letterSpacing: 1,
                    color: Colors.lightGrey,
                  }}
                >
                  {item?.ChallengeType}
                </Text>
                <Text
                  style={{
                    fontSize: height * 0.018,
                    letterSpacing: 1,
                    color: Colors.violet,
                  }}
                >
                  {item?.status}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default YourChallenges;

const styles = StyleSheet.create({
  challengeContainer: {
    flexDirection: "column",
    // rowGap: 10,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 2,
    marginTop: 5,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  challengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  challengeImage: {
    width: "100%",
    height: height * 0.35, // Responsive height
    alignSelf: "center",
    resizeMode: "contain",
    borderRadius: 20,
  },
});
