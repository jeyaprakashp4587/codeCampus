import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Colors, pageView } from "../constants/Colors";
import HeadingText from "../utils/HeadingText";
import PragraphText from "../utils/PragraphText";
import { useData } from "../Context/Contexter";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { Paragraph } from "react-native-paper";
import Ripple from "react-native-material-ripple";
import { ScrollView } from "react-native";
import { Dimensions } from "react-native";

const Challenge = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const { selectedChallengeTopic, setselectedChallengeTopic } = useData();
  const Challenges = [
    {
      ChallengeName: "Web Development",
      bgColor: "#008080",
      img: "https://i.ibb.co/qn5dFQL/data.png",
    },
    {
      ChallengeName: "App development",
      bgColor: "#8cb3d9",
      img: "https://i.ibb.co/WcPBv7x/app.png",
    },
    {
      ChallengeName: "Problem Solving",
      bgColor: "#b3b3ff",
      img: "https://i.ibb.co/QQT3CGx/problem-solving.png",
    },
  ];

  const HandleSelectChallenges = (item) => {
    navigation.navigate("chooseChallenge");
    setselectedChallengeTopic(item.ChallengeName);
  };
  //
  const [chToggle, setChaToggle] = useState();
  return (
    <ScrollView>
      <View style={pageView}>
        <HeadingText text="Develop Your Skills Here" />
        {Challenges.map((item, index) => (
          <TouchableOpacity
            onPress={() => HandleSelectChallenges(item)}
            key={index}
            style={{
              width: "100%",
              backgroundColor: item.bgColor,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              marginTop: 30,
              elevation: 7,
              flexDirection: "row",
              columnGap: 20,
            }}
          >
            <Image
              source={{ uri: item.img }}
              style={{ width: 40, height: 40, tintColor: Colors.veryLightGrey }}
            />
            <PragraphText
              text={item.ChallengeName}
              fsize={19}
              color={Colors.veryLightGrey}
            />
          </TouchableOpacity>
        ))}
        {/* user challenges list */}
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#adc2eb",
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginTop: 30,
            elevation: 7,
            flexDirection: "row",
            columnGap: 20,
          }}
        >
          <FontAwesomeIcon icon={faCode} size={40} color="white" />
          <PragraphText
            text="My Challenges"
            fsize={19}
            color={Colors.veryLightGrey}
          />
        </TouchableOpacity>
        {/* show option */}
        <View style={{ borderWidth: 1, marginTop: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Ripple>
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
            <Ripple>
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
        </View>
        {/* {chToggle ? (
        <View>
          <View>
            <Ripple></Ripple>
            <Ripple></Ripple>
          </View>
        </View>
      ) : (
        <View></View>
      )} */}
      </View>
    </ScrollView>
  );
};

export default Challenge;

const styles = StyleSheet.create({});
