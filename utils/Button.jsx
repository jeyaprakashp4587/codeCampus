import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Colors, font } from "../constants/Colors";

const Button = (props) => {
  return (
    <TouchableOpacity
      onPressIn={props.function}
      onPress={props.function}
      style={{
        // borderWidth: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
        backgroundColor: props.bgcolor ? props.bgcolor : Colors.veryLightGrey,
        elevation: 2,
        width: props.width ? props.width : "auto",
      }}
    >
      <Text
        style={{
          fontFamily: font.poppins,
          fontSize: 15,
          color: props.textColor ? props.textColor : "black",
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
