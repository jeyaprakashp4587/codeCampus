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
        borderRadius: props.radius ? props.radius : 5,
        backgroundColor: props.bgcolor ? props.bgcolor : Colors.veryLightGrey,
        // backgroundColor: "t"
        elevation: props.elevation ? props.elevation : 2,
        width: props.width ? props.width : "auto",
      }}
    >
      <Text
        style={{
          fontFamily: font.poppins,
          fontSize: props.fsize ? props.fsize : 15,
          color: props.textColor ? props.textColor : "black",
          fontWeight: props.fweight ? props.fweight : "400",
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
