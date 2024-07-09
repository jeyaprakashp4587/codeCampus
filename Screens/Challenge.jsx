import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { Colors, pageView } from "../constants/Colors";
import HeadingText from "../utils/HeadingText";
import PragraphText from "../utils/PragraphText";
import { useData } from "../Context/Contexter";

const Challenge = ({ navigation }) => {
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
  return (
    <View style={pageView}>
      <HeadingText text="Develop Your Skills Here" />
      {Challenges.map((item, index) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("chooseChallenge");
            setselectedChallengeTopic(item.ChallengeName);
          }}
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
    </View>
  );
};

export default Challenge;

const styles = StyleSheet.create({});
