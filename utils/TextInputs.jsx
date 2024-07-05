import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { Colors, font } from "../constants/Colors";

const TextInputs = (props) => {
  return (
    <TextInput
      placeholder={props.text}
      style={{
        fontFamily: font.poppins,
        fontSize: 15,
        borderWidth: 1,
        padding: 10,
        borderColor: Colors.lightGrey,
        borderRadius: 5,
        paddingHorizontal: 20,
        marginTop: 20,
      }}
      placeholderTextColor={Colors.lightGrey}
    />
  );
};

export default TextInputs;

const styles = StyleSheet.create({});
