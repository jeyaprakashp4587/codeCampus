import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./Navigations/Navigation";
import { ContextProvider } from "./Context/Contexter";
import SplashScreen from "./Splashscreen/SplashScreen";
import { PaperProvider } from "react-native-paper";

const App = () => {
  // this load for render splash screen
  const [load, setLoad] = useState(true);
  const Handleduration = (data) => {
    setLoad(data);
  };

  // render the components

  return (
    <PaperProvider>
      <NavigationContainer>
        <ContextProvider>
          <SafeAreaView style={styles.cn}>
            {load ? <SplashScreen duration={Handleduration} /> : <Navigation />}
          </SafeAreaView>
        </ContextProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  cn: {
    flex: 1,
    backgroundColor: "#ffff",
    // marginTop: "10%",
    // paddingHorizontal: 10,
  },
});
