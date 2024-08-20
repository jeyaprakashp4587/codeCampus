import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, pageView } from "../constants/Colors";

const Placement = () => {
  return (
    <View style={pageView}>
      <Text
        numberOfLines={2}
        style={{
          fontSize: 20,
          padding: 10,
          color: Colors.mildGrey,
          letterSpacing: 2,
        }}
      >
        We Are Working on it... :) and it will be add comm small update and push
        and ake some ui update
      </Text>
    </View>
  );
};

export default Placement;

const styles = StyleSheet.create({});
