import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useRef } from "react";
import { Colors, font, pageView } from "../constants/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import Api from "../Api";
import Ripple from "react-native-material-ripple";
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
  const [loading, setLoading] = useState(false);
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
        setLoading(false);
        isValid = false;
      } else {
        refs[key].current.setNativeProps({
          style: { borderColor: Colors.veryLightGrey, borderWidth: 0 },
        });
      }
    }

    // Additional validation
    if (Password !== Confirm_Password) {
      refs.Confirm_Password.current.setNativeProps({
        style: { borderColor: "red", borderWidth: 1 },
      });
      Alert.alert("Password Does't Match");
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
    setLoading(true);
    // console.log(formData.First_Name);
    if (validateForm()) {
      const valid = await axios.post(`${Api}/LogIn/signUp`, formData);
      if (valid.data == "SignUp Sucessfully") {
        setLoading(false);
        console.log(valid.data);
        Alert.alert("Signup Sucessfully");
        navigation.navigate("login");
      } else if (valid.data == "Email has Already Taken") {
        setLoading(false);
        Alert.alert("Email has Already Taken");
      }
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
            source={{ uri: "https://i.ibb.co/Njft952/signbg.jpg" }}
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
                // padding: 2,
                borderRadius: 10,
                textDecorationLine: "none",
              }}
              key={key}
              mode="outlined"
              textColor={Colors.mildGrey}
              activeOutlineColor={Colors.mildGrey}
              // outlineColor={Colors.veryLightGrey}
              outlineColor={Colors.mildGrey}
              label={key.replace("_", " ")}
              ref={refs[key]}
              onChangeText={(text) => handleInput(key, text)}
            />
          ))}
        </View>
        <View style={{ height: 20 }} />
        <Ripple
          onPress={() => handleSignUp()}
          style={{
            // borderWidth: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 12,
            borderRadius: 5,
            backgroundColor: "orange",
            elevation: 2,
            width: "100%",
            alignSelf: "center",
            columnGap: 10,
          }}
        >
          {loading && <ActivityIndicator size={22} color={Colors.mildGrey} />}
          <Text
            style={{
              fontSize: 15,
              color: "black",
              fontWeight: "400",
              letterSpacing: 1,
            }}
          >
            Sign Up
          </Text>
        </Ripple>
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
