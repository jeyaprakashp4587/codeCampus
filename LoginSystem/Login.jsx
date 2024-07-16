import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { Colors, font, pageView } from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../utils/Button";
import Api from "../Api";
import axios from "axios";
import { TextInput } from "react-native-paper";
import { Alert } from "react-native";
import { useData } from "../Context/Contexter";

const Login = ({ navigation }) => {
  const { setUser } = useData();
  // console.log(Api);
  const [form, setForm] = useState({
    Email: "",
    Password: "",
  });
  const handleEmail = (name, text) => {
    setForm({ ...form, [name]: text });
  };
  const handlePassword = (name, text) => {
    setForm({ ...form, [name]: text });
  };
  const Validation = () => {
    let isValid = true;
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.Email)) {
      Alert.alert("Email was Not Corrected");
      isValid = false;
    }
    for (let val in form) {
      if (!form[val]) {
        Alert.alert("Email was Not Corrected");
      }
    }
    return isValid;
  };
  const HandleLogin = () => {
    if (Validation()) {
      axios.post(`${Api}/LogIn/signIn`, form).then((data) => {
        console.log(data.data);
        if (data.data.firstName) {
          AsyncStorage.setItem("Email", data.data.Email);
          setUser(data.data);
          navigation.navigate("index");
        } else {
          Alert.alert("Email or Password is Incorrect");
        }
      });
    }
  };
  // send the user data to server

  return (
    <View
      style={[
        pageView,
        { paddingHorizontal: 30, flexDirection: "column", rowGap: 35 },
      ]}
    >
      <View>
        <Image
          source={require("../assets/images/loginbg.png")}
          style={{ width: 300, height: 300, alignSelf: "center" }}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 21,
            // fontFamily: "PopIns-Regular",
            lineHeight: 35,
            color: Colors.veryDarkGrey,
          }}
        >
          Welcome To Code Campus, Growth Your Career From Here
        </Text>
      </View>
      {/* login inputs wrapper */}
      <View style={{ flexDirection: "column", rowGap: 20 }}>
        <TextInput
          style={{ backgroundColor: "white" }}
          mode="outlined"
          textColor={Colors.mildGrey}
          activeOutlineColor={Colors.mildGrey}
          outlineColor={Colors.mildGrey}
          outlineStyle={{ borderWidth: 1 }}
          label="Email"
          onChangeText={(text) => handleEmail("Email", text)}
        />
        <TextInput
          style={{ backgroundColor: "white" }}
          mode="outlined"
          textColor={Colors.mildGrey}
          outlineStyle={{ borderWidth: 1 }}
          activeOutlineColor={Colors.mildGrey}
          outlineColor={Colors.mildGrey}
          label="Password"
          onChangeText={(text) => handlePassword("Password", text)}
        />
        <Button
          bgcolor={Colors.veryLightGrey}
          text="Log in"
          function={() => HandleLogin()}
          width="100%"
        />
      </View>
      {/* indicate */}
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: Colors.veryLightGrey,
        }}
      >
        <Text
          style={{
            position: "absolute",
            color: Colors.lightGrey,
            // fontFamily: font.poppins,
            backgroundColor: "white",
            top: -10,
            textAlign: "center",
            alignSelf: "center",
          }}
        >
          OR
        </Text>
      </View>
      {/* login options */}
      <View
        style={{
          // borderWidth: 1,
          // height: 100,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          columnGap: 20,
        }}
      >
        <TouchableOpacity>
          <Image
            source={require("../assets/images/search.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/facebook.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/github.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          // fontFamily: "PopIns-Regular",
        }}
      >
        <Text style={{ fontFamily: font.poppins }}>Don't Have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
          <Text
            style={{
              // fontFamily: font.poppins,
              color: "orange",
              textDecorationLine: "underline",
              paddingHorizontal: 10,
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
