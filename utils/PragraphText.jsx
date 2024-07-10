import { View, Text } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

const PragraphText = (props) => {
  return (
    <Text
      style={{
        color: props.color ? props.color : Colors.mildGrey,
        fontSize: props.fsize ? props.fsize : 16,
        lineHeight: 27,
        letterSpacing: 0.9,
        paddingVertical: props.padding ? props.padding : 10,
      }}
    >
      {props.text}
    </Text>
  );
};

export default PragraphText;
