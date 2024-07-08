import { View, Text } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

const PragraphText = (props) => {
  return (
    <Text
      style={{
        color: Colors.mildGrey,
        fontSize: 16,
        lineHeight: 27,
        letterSpacing: 0.9,
        paddingVertical: 10,
      }}
    >
      {props.text}
    </Text>
  );
};

export default PragraphText;
