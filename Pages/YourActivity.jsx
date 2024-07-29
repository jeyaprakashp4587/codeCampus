import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { pageView } from "../constants/Colors";
import HeadingText from "../utils/HeadingText";
import HrLine from "../utils/HrLine";
import { Calendar } from "react-native-calendars";

const YourActivity = () => {
  return (
    <View style={pageView}>
      {/* heading text */}
      <HeadingText text="Your Activities" />
      {/* calender preview */}
      <Calendar
        style={{ borderWidth: 0 }}
        markedDates={{ "2024-07-10": { marked: true } }}
      />
      {/* list Activities */}
      <HrLine width="100%" />
    </View>
  );
};

export default YourActivity;

const styles = StyleSheet.create({});
