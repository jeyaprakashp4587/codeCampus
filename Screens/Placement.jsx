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
        I'm Back after big break
      </Text>
    </View>
  );
};

export default Placement;

const styles = StyleSheet.create({});
