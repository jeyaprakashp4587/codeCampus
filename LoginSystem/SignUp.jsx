import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import React, { useRef } from "react";
import { Colors, font, pageView } from "../constants/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import Button from "../utils/Button";
import { useState } from "react";
import { TextInput } from "react-native-paper";
import axios from "axios";
import Api from "../Api";
const SignUp = ({ navigation }) => {
  // all input values
  const refs = useRef({
    First_Name: React.createRef(),
    Last_Name: React.createRef(),
    Email: React.createRef(),
    Password: React.createRef(),
    Confirm_Password: React.createRef(),
    Gender: React.createRef(),
    Date_Of_Birth: React.createRef(),
    Degree_name: React.createRef(),
    Institute_Name: React.createRef(),
    State: React.createRef(),
    District: React.createRef(),
    Nationality: React.createRef(),
  }).current;

  const formData = useRef({
    First_Name: "",
    Last_Name: "",
    Email: "",
    Password: "",
    Confirm_Password: "",
    Gender: "",
    Date_Of_Birth: "",
    Degree_name: "",
    Institute_Name: "",
    State: "",
    District: "",
    Nationality: "",
  }).current;

  const handleInput = (name, value) => {
    formData[name] = value;
  };

  const validateForm = () => {
    let isValid = true;
    const { Password, Confirm_Password, Email } = formData;

    for (let key in formData) {
      if (!formData[key]) {
        refs[key].current.setNativeProps({
          style: { borderColor: "red", borderWidth: 1, borderRadius: 5 },
        });
        isValid = false;
      } else {
        refs[key].current.setNativeProps({
          style: { borderColor: Colors.veryLightGrey, borderWidth: 1 },
        });
      }
    }

    // Additional validation
    if (Password !== Confirm_Password) {
      refs.Confirm_Password.current.setNativeProps({
        style: { borderColor: "red", borderWidth: 1 },
      });
      isValid = false;
    }

    // Example email validation (simplistic)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(Email)) {
      refs.Email.current.setNativeProps({
        style: { borderColor: "red", borderWidth: 1 },
      });
      isValid = false;
    }

    return isValid;
  };
  const handleSignUp = async () => {
    // console.log(formData.First_Name);
    if (validateForm()) {
      const valid = await axios.post(`${Api}/LogIn/signUp`, formData);
      console.log(valid);
    }
  };
  return (
    <View style={[pageView, { paddingHorizontal: 20, paddingBottom: 20 }]}>
      <Text
        style={{
          textAlign: "center",
          // fontFamily: font.poppins,
          fontSize: 35,
          // fontWeight: 700,
          color: "hsl(0, 0%, 50%)",
          paddingBottom: 10,
        }}
      >
        Sign Up
      </Text>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: 10 }}>
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
        {/* textinputs */}
        <View style={{ flexDirection: "column", rowGap: 5 }}>
          {Object.keys(formData).map((key) => (
            <TextInput
              style={{
                marginTop: 5,
                backgroundColor: "white",
                padding: 2,
                borderRadius: 10,
                textDecorationLine: "none",
              }}
              key={key}
              mode="outlined"
              textColor={Colors.mildGrey}
              activeOutlineColor={Colors.mildGrey}
              outlineColor={Colors.mildGrey}
              label={key.replace("_", " ")}
              ref={refs[key]}
              onChangeText={(text) => handleInput(key, text)}
            />
          ))}
        </View>
        <View style={{ height: 20 }} />
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
