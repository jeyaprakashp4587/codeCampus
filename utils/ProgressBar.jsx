import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

const ProgressBar = (props) => {
  return (
    <View
      style={{
        borderWidth: 1,
        width: 300,
        padding: 0,
        borderRadius: 10,
        borderColor: Colors.lightGrey,
        overflow: "hidden",
      }}
    >
      <View
        style={{ backgroundColor: "orange", width: props.width, padding: 2 }}
      ></View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({});
