import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { Colors, pageView } from "../constants/Colors";
const LearnPage = () => {
  return (
    <View style={[pageView]}>
      <View
        style={{
          //   borderWidth: 1,
          position: "absolute",
          zIndex: 20,
          backgroundColor: "white",
          width: "100%",
          height: 50,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 25, color: Colors.mildGrey }}>Study Area</Text>
      </View>
      <View
        style={{
          //   borderWidth: 1,
          position: "absolute",
          zIndex: 20,
          backgroundColor: "white",
          width: "100%",
          height: 55,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          top: "4.5%",
          left: 70,
        }}
      />
      <View
        style={{
          //   borderWidth: 1,
          position: "absolute",
          zIndex: 20,
          backgroundColor: "white",
          width: "100%",
          height: 70,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          top: "9%",
        }}
      ></View>
      {/* postioning */}
      <WebView
        javaScriptEnabled={true}
        source={{ uri: "https://www.w3schools.com/cpp/default.asp" }}
      />
    </View>
  );
};

export default LearnPage;

const styles = StyleSheet.create({});
