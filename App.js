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
import Test from "./Screens/Test";
// import checkForUpdates from "./update/checkForUpdates";
// -----
const { width } = Dimensions.get("window");
const App = () => {
  // this load for render splash screen
  const [load, setLoad] = useState(true);
  const Handleduration = (data) => {
    setLoad(data);
    // checkForUpdates();
  };
  // call the notification

  return (
    <PaperProvider>
      {/* <NavigationContainer> */}
      <ContextProvider>
        <SafeAreaView style={styles.cn}>
          {load ? <SplashScreen duration={Handleduration} /> : <Navigation />}
          {/* <Navigation /> */}
        </SafeAreaView>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      </ContextProvider>
      {/* </NavigationContainer> */}
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
