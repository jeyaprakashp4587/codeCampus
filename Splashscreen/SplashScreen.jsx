import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, pageView } from "../constants/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../utils/ProgressBar";
import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Api from "../Api";
import { useNavigation } from "@react-navigation/native";
import { useData } from "../Context/Contexter";

const SplashScreen = ({ duration, navigation }) => {
  const { user, setUser } = useData();
  const { height, width } = Dimensions.get("window");
  const nav = useNavigation();
  const [length, setLength] = useState(0);
  // auto login
  const validLogin = async () => {
    try {
      const email = await AsyncStorage.getItem("Email");
      console.log(email);
      if (email) {
        const response = await axios.post(`${Api}/LogIn/splash`, {
          Email: email,
        });
        if (response.data.Email) {
          setUser(response.data);
          nav.navigate("Tab");
        }
      } else {
        nav.navigate("login");
      }
    } catch (error) {
      console.error("Error fetching email or logging in:", error);
    }
  };

  useEffect(() => {
    validLogin();
  }, []);

  useEffect(() => {
    for (let i = 0; i <= 320; i++) {
      setTimeout(() => {
        setLength(i);
      }, 0);
    }
  }, []);

  return (
    <View
      style={[pageView, { flexDirection: "column", justifyContent: "center" }]}
    >
      <View
        style={{
          // borderWidth: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          rowGap: 100,
        }}
      >
        {/* <Image
          source={require("../assets/images/splash.png")}
          style={{
            width: 400,
            height: 400,
          }}
        /> */}

        <Text
          style={{
            // fontFamily: "PopIns-Regular",
            fontSize: 40,
          }}
        >
          Code Campus
        </Text>
        <Text
          style={{
            position: "absolute",
            top: height * 0.09,
            color: Colors.violet,
            right: width * 0.1,
            fontWeight: 600,
            fontSize: width * 0.03,
            letterSpacing: 2,
          }}
        >
          Beta Version
        </Text>
        <FontAwesomeIcon
          icon={faCode}
          size={300}
          color={Colors.veryLightGrey}
          style={{ position: "absolute", zIndex: -10, top: -120 }}
        />
        {/* progress bar */}
        <View style={{ position: "absolute", bottom: -300 }}>
          <ProgressBar width={length} />
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
