import React, { useState, useEffect } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./Navigations/Navigation";
import { ContextProvider } from "./Context/Contexter";
import SplashScreen from "./Splashscreen/SplashScreen";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "react-native";
import useSocket from "./Socket/useSocket";
import useSocketEmit from "./Socket/useSocketEmit";
import * as Updates from "expo-updates";
// import checkForUpdates from "./update/checkForUpdates";
// -----
const { width } = Dimensions.get("window");
const App = () => {
  return (
    <PaperProvider>
      <ContextProvider>
        <SafeAreaView style={styles.cn}>
          <Navigation />
        </SafeAreaView>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      </ContextProvider>
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  cn: {
    flex: 1,
    width: width,
    backgroundColor: "#ffff",
    // marginTop: "10%",
    // paddingHorizontal: 10,
  },
});
