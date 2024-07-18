import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, pageView } from "../constants/Colors";
import { useData } from "../Context/Contexter";
import HeadingText from "../utils/HeadingText";
import TopicsText from "../utils/TopicsText";
import ParagraphText from "../utils/PragraphText";
import Ripple from "react-native-material-ripple";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
// import Button from "../utils/Button";
import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { Divider, Menu, SegmentedButtons } from "react-native-paper";
import { faBars, faL } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import Api from "../Api";

const ChooseChallenge = ({ navigation }) => {
  // level list
  const Levels = [
    {
      name: "Newbie",
      bgcolor: "#009900",
    },
    {
      name: "Junior",
      bgcolor: "#cca300",
    },
    {
      name: "Expert",
      bgcolor: "#cc6600",
    },
    {
      name: "Legend",
      bgcolor: "#990000",
    },
  ];
  // end levels
  const { selectedChallengeTopic, setSelectedChallenge } = useData();
  const [Challenges, setChallenges] = useState();
  // get the All challenges by their topics
  const getChallenges = async () => {
    const res = await axios.post(`${Api}/Challenges/getChallenges`, {
      ChallengeTopic: selectedChallengeTopic,
    });
    if (res.data) {
      setChallenges([...res.data.newbieLevel, ...res.data.expertLevel]);
      // console.log("expert", res.data.expertLevel);
    }
  };
  useEffect(() => {
    getChallenges();
  }, [selectedChallengeTopic]);
  //
  // console.log(res.data);
  // }
  // useEffect(() => {
  //   switch (selectedChallengeTopic) {
  //     case "Web Development":
  //       setChallenges(juniorLevel);
  //       break;
  //     case "App Development":
  //       // setselectedChallengeTopic("")
  //       break;
  //     case "Problem Solving":
  //       break;

  //     default:
  //       break;
  //   }
  //   // console.log(selectedChallengeTopic);
  //   setChallenges(newbieLevel);
  // }, []);
  //  handle level
  const [difficultyInfo, setDifficultyInfo] = useState("Newbie");
  const HandleSelectLevel = (levelName) => {
    setDifficultyInfo(levelName);
    setVisible(false);
    switch (levelName) {
      case "Newbie":
        setChallenges(newbieLevel);
        break;
      case "Junior":
        setChallenges(juniorLevel);
        break;
      case "Expert":
        setChallenges(expertLevel);
        break;
      case "Legend":
        setChallenges(legendLevel);
        break;
      default:
        setChallenges(newbieLevel);
        break;
    }
  };
  //
  // for show levels
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  //
  return (
    <View style={pageView}>
      <HeadingText text={selectedChallengeTopic} />
      <View style={{ height: 10 }} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TopicsText text="Choose Difficulty Level" fszie={20} mb={1} />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <FontAwesomeIcon
                icon={faBars}
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
              style={{ backgroundColor: Colors.mildGrey }}
            />
          ))}
        </Menu>
      </View>
      <FlatList
        data={Challenges}
        showsVerticalScrollIndicator={false}
        style={{
          alignSelf: "center",
          borderWidth: 0,
          width: "100%",
        }}
        renderItem={({ item, index }) => (
          <View
            style={{
              // borderWidth: 1,
              flexDirection: "column",
              rowGap: 10,
              padding: 20,
              backgroundColor: "white",
              borderRadius: 5,
              elevation: 2,
              marginTop: 15,
              marginHorizontal: 5,
              marginBottom: 5,
            }}
            key={index}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
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
            {item?.level == "newbie" ? null : (
              <Image
                source={{
                  uri: item.sample_image,
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
            <Text
              style={{
                color: Colors.veryDarkGrey,
                lineHeight: 24,
                letterSpacing: 1,
              }}
            >
              {item.description}
            </Text>
            <View
              style={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* <View style={{ flexDirection: "row", columnGap: 20 }}>
                {item.technologies.map((i, index) =>
                  React.cloneElement(i.icon, { size: 20, key: index })
                )}
              </View> */}
              <View>
                <Feather
                  name="check-circle"
                  size={20}
                  color={Colors.mildGrey}
                />
              </View>
            </View>
            <LinearGradient
              colors={["#003399", "#6699ff", "#003399"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ borderRadius: 10, overflow: "hidden" }}
            >
              {/* <Button
                text="View Challenge"
                bgcolor="transparent"
                radius={0.2}
                elevation={0.1}
                textColor="white"
                function={() => {
                  // setSelectedChallenge(item);
                }}
              /> */}
              <Button
                rippleColor="lightgrey"
                onPress={() => {
                  navigation.navigate("challengeDetail");
                  setSelectedChallenge(item);
                }}
                style={{
                  borderRadius: 5,
                  height: 45,
                  padding: 0,
                  justifyContent: "center",
                  width: "100%",
                }}
                textColor="white"
              >
                <Text style={{ letterSpacing: 1 }}>View Challenge</Text>
              </Button>
            </LinearGradient>
          </View>
        )}
      />
    </View>
  );
};

export default ChooseChallenge;

const styles = StyleSheet.create({});
