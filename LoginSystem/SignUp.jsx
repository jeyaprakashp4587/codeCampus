import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Colors, font, pageView } from "../constants/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import TextInputs from "../utils/TextInputs";
import Button from "../utils/Button";
const SignUp = ({ navigation }) => {
  // input place holder datas
  const inputHolders = [
    { text: "First Name" },
    { text: "Last Name" },
    { text: "Email" },
    { text: "Password" },
    { text: "Confirm Password" },
    { text: "Gender" },
    { text: "Date Of Birth" },
    { text: "Degree name" },
    { text: "Institude Name" },
    { text: "State" },
    { text: "District" },
    { text: "Nationality" },
  ];
  const handleSignUp = () => {
    navigation.navigate("index");
  };
  return (
    <View style={[pageView, { paddingHorizontal: 20, paddingBottom: 20 }]}>
      <View style={{ paddingBottom: 10 }}>
        <Text
          style={{
            textAlign: "center",
            // fontFamily: font.poppins,
            fontSize: 35,
            // fontWeight: 700,
            color: "hsl(0, 0%, 50%)",
          }}
        >
          Sign Up
        </Text>
        <Image
          source={require("../assets/images/signbg.jpeg")}
          style={{ width: 300, height: 300, alignSelf: "center" }}
        />
        <Text
          style={{
            // fontFamily: font.poppins,
            textAlign: "center",
            color: Colors.lightGrey,
          }}
        >
          {"<"} Skills Will Speak Louder Than Papers /{">"}
        </Text>
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* textinputs */}
        <View style={{ flexDirection: "column", rowGap: 5 }}>
          {inputHolders.map((item) => (
            <TextInputs text={item.text} />
          ))}
        </View>
        <View style={{ height: 30 }} />
        <Button
          bgcolor="#ffa366"
          text="Sign Up"
          textColor="white"
          function={handleSignUp}
          width="100%"
        />
      </ScrollView>
      <FontAwesomeIcon
        icon={faCode}
        size={500}
        color="hsl(0, 0%, 97%)"
        style={{
          position: "absolute",
          zIndex: -10,
          top: 370,
          alignSelf: "center",
        }}
      />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
