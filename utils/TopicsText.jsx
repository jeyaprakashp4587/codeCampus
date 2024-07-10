import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

const TopicsText = (props) => {
  return (
    <Text
      style={{
        fontSize: props.fszie ? props.fszie : 23,
        color: Colors.mildGrey,
        marginBottom: 20,
      }}
    >
      {props.text}
    </Text>
  );
};

export default TopicsText;

const styles = StyleSheet.create({});
