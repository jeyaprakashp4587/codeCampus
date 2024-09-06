import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, pageView } from "../constants/Colors";
import { useData } from "../Context/Contexter";
import HeadingText from "../utils/HeadingText";
import TopicsText from "../utils/TopicsText";
import ParagraphText from "../utils/PragraphText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Feather } from "@expo/vector-icons";
import { Button, Menu } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import {
  faBars,
  faHandDots,
  faListDots,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Api from "../Api";
import Skeleton from "../Skeletons/Skeleton";
import Ripple from "react-native-material-ripple";

const { width, height } = Dimensions.get("window");

const ChooseChallenge = ({ navigation }) => {
  const Levels = [
    { name: "Newbie", bgcolor: "#009900" },
    { name: "Junior", bgcolor: "#cca300" },
    { name: "Expert", bgcolor: "#cc6600" },
    { name: "Legend", bgcolor: "#990000" },
  ];

  const { selectedChallengeTopic, setSelectedChallenge } = useData();
  const [Challenges, setChallenges] = useState();
  const [difficultyInfo, setDifficultyInfo] = useState("Newbie");
  const [visible, setVisible] = useState(false);

  const getChallenges = async (ChallengeTopic) => {
    // console.log(ChallengeTopic);
    const res = await axios.post(`${Api}/Challenges/getChallenges`, {
      ChallengeTopic: ChallengeTopic,
    });
    if (res.data) {
      setChallenges([
        ...res.data.newbieLevel,
        ...res.data.juniorLevel,
        ...res.data.expertLevel,
        ...res.data.legendLevel,
      ]);
    }
    return res.data;
  };

  useEffect(() => {
    getChallenges(selectedChallengeTopic);
  }, [selectedChallengeTopic]);

  const HandleSelectLevel = (levelName) => {
    setDifficultyInfo(levelName);
    setChallenges(false);
    setVisible(false);
    switch (levelName) {
      case "Newbie":
        getChallenges(selectedChallengeTopic).then((data) =>
          setChallenges([...data.newbieLevel])
        );
        break;
      case "Junior":
        getChallenges(selectedChallengeTopic).then((data) =>
          setChallenges([...data.juniorLevel])
        );
        break;
      case "Expert":
        getChallenges(selectedChallengeTopic).then((data) =>
          setChallenges([...data.expertLevel])
        );
        break;
      case "Legend":
        getChallenges(selectedChallengeTopic).then((data) =>
          setChallenges([...data.legendLevel])
        );
        break;
      default:
        break;
    }
  };

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.pageView}>
      <HeadingText text={selectedChallengeTopic} />
      <View style={styles.spacing} />
      <View style={styles.header}>
        <TopicsText text="Choose Difficulty Level" fszie={20} mb={1} />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <FontAwesomeIcon
                icon={faListDots}
                color={Colors.mildGrey}
                size={20}
              />
            </TouchableOpacity>
          }
        >
          {Levels.map((level, index) => (
            <Menu.Item
              key={index}
              rippleColor="orange"
              onPress={() => HandleSelectLevel(level.name)}
              title={level.name}
              titleStyle={{
                color: "white",
                letterSpacing: 1,
                fontWeight: 300,
              }}
              style={{
                backgroundColor: Colors.mildGrey,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 1,
              }}
            />
          ))}
        </Menu>
      </View>
      {!Challenges ? (
        Levels.map((i, index) => (
          <View key={index}>
            <Skeleton wight="100%" height={200} radius={10} mt={20} />
          </View>
        ))
      ) : (
        <FlatList
          data={Challenges}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          renderItem={({ item, index }) => (
            <View style={styles.challengeContainer} key={index}>
              <View style={styles.challengeHeader}>
                <ParagraphText
                  text={item.title}
                  fsize={18}
                  padding={5}
                  widht="70%"
                />
                <ParagraphText
                  text={item.level ? item.level : difficultyInfo}
                  fsize={15}
                  padding={5}
                  color="orange"
                />
              </View>
              {item?.level !== "newbie" && (
                <Image
                  source={{ uri: item.sample_image }}
                  style={styles.challengeImage}
                />
              )}
              <Text style={styles.challengeDescription}>
                {item.description}
              </Text>
              <View style={styles.technologiesContainer}>
                <View style={styles.technologies}>
                  {item.technologies.map((i, index) => (
                    <Image
                      key={index}
                      source={{ uri: i.icon }}
                      style={styles.technologyIcon}
                    />
                  ))}
                </View>
                <Feather
                  name="check-circle"
                  size={20}
                  color={Colors.mildGrey}
                />
              </View>
              <Ripple
                rippleColor="lightgrey"
                onPress={() => {
                  navigation.navigate("challengeDetail");
                  setSelectedChallenge(item);
                }}
                textColor="white"
                // style={{ padding: 1 }}
              >
                <LinearGradient
                  colors={["#003399", "#6699ff", "#003399"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.linearGradient}
                >
                  <Text style={styles.viewChallengeButtonText}>
                    View Challenge
                  </Text>
                </LinearGradient>
              </Ripple>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ChooseChallenge;

const styles = StyleSheet.create({
  pageView: {
    ...pageView,
  },
  spacing: {
    height: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flatList: {
    alignSelf: "center",
    borderWidth: 0,
    width: "100%",
  },
  challengeContainer: {
    flexDirection: "column",
    rowGap: 10,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 2,
    marginTop: 15,
    marginHorizontal: 5,
    marginBottom: 5,
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
  challengeDescription: {
    color: Colors.veryDarkGrey,
    lineHeight: 24,
    letterSpacing: 1,
  },
  technologiesContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  technologies: {
    flexDirection: "row",
    columnGap: 20,
  },
  technologyIcon: {
    width: width * 0.08, // Responsive width
    height: width * 0.08, // Responsive height
  },
  linearGradient: {
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  viewChallengeButton: {
    borderRadius: 5,
    height: 45,
    padding: 0,
    justifyContent: "center",
    width: "100%",
  },
  viewChallengeButtonText: {
    letterSpacing: 1,
    color: "white",
  },
});
