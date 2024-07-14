import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Colors, font, pageView } from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../utils/Button";

const Login = ({ navigation }) => {
  const UserEmail = useRef(null);
  const HandleEmail = (text) => {
    if (UserEmail) {
      UserEmail.current = text;
    }
  };
  const HandleLogin = () => {
    console.log(UserEmail.current);
    AsyncStorage.setItem("email", UserEmail.current);
  };
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
          placeholder="Email"
          style={{
            // fontFamily: font.poppins,
            fontSize: 15,
            borderWidth: 1,
            padding: 10,
            borderColor: Colors.lightGrey,
            borderRadius: 5,
            paddingHorizontal: 20,
          }}
          placeholderTextColor={Colors.lightGrey}
          onChangeText={HandleEmail}
        />
        <TextInput
          placeholder="Password"
          style={{
            // fontFamily: font.poppins,
            fontSize: 15,
            padding: 10,
            borderColor: Colors.lightGrey,
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 20,
          }}
          placeholderTextColor={Colors.lightGrey}
        />
        <Button
          bgcolor={Colors.veryLightGrey}
          text="Log in"
          function={HandleLogin}
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
