import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TopicsText from "../utils/TopicsText";
import HeadingText from "../utils/HeadingText";
import { Colors, pageView } from "../constants/Colors";
import Moment from "moment";

const Placement = () => {
  console.log(Moment().format("YYYY-MM-DDTHH:mm:ss"));
  return (
    <View style={pageView}>
      {/* header */}
      <HeadingText text="Placement" />
      {/* jobs lists */}
    </View>
  );
};

export default Placement;

const styles = StyleSheet.create({});
