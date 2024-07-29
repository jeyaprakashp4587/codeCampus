import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { pageView } from "../constants/Colors";
import HeadingText from "../utils/HeadingText";
import HrLine from "../utils/HrLine";
import { Calendar } from "react-native-calendars";
import Actitivity from "../hooks/ActivityHook";
import { useData } from "../Context/Contexter";
import Api from "../Api";
import axios from "axios";

const YourActivity = () => {
  const { user } = useData();
  useEffect(() => {
    // console.log(user._id);
    // Actitivity(user._id, "Logged IN");
    getAllActivityDates();
  }, []);
  // get the activity dates
  const [dates, setDates] = useState([]);
  const getAllActivityDates = async () => {
    const res = await axios.post(
      `${Api}/Activity/getAllActitvityDates/${user._id}`
    );
    if (res.data) {
      const markedDatesArray = res.data.map((date) => ({
        [date]: { marked: true },
      }));
      const markedDates = Object.assign({}, ...markedDatesArray);
      setDates(markedDates);
    }
  };
  // get the particular date activities
  const getParticularDateActivities = async (date) => {
    console.log(date.dateString);
    const res = await axios.post(
      `${Api}/Activity/getParticularDateActitvities/${user._id}`,
      { Date: date.dateString }
    );
    console.log(res.data);
  };

  return (
    <View style={pageView}>
      {/* heading text */}
      <HeadingText text="Your Activities" />
      {/* calender preview */}
      <Calendar
        style={{ borderWidth: 0 }}
        markedDates={dates}
        onDayPress={getParticularDateActivities}
      />
      {/* list Activities */}
      <HrLine width="100%" />
    </View>
  );
};

export default YourActivity;

const styles = StyleSheet.create({});
