import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, pageView } from "../constants/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../utils/ProgressBar";
import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as font from "expo-font";

const splashScreen = (props) => {
  useEffect(() => {
    const loadFont = async () => {
      await font.loadAsync({
        "PopIns-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "PopIns-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
      });
      setFontsLoaded(true);
    };
    // loadFont();
  }, []);
  //
  const [length, setLength] = useState(0);

  useEffect(() => {
    AsyncStorage.setItem("status", "index");
    // AsyncStorage.removeItem("status");
    let st = AsyncStorage.getItem("status");
    for (let i = 0; i <= 320; i++) {
      setTimeout(() => {
        setLength(i);
        if (i == 30) {
          props.duration(false);
          props.status(st);
        }
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
            fontFamily: "PopIns-Regular",
            fontSize: 40,
          }}
        >
          Code Campus
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

export default splashScreen;

const styles = StyleSheet.create({});
