import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, pageView } from "../constants/Colors";
import HeadingText from "../utils/HeadingText";
import HrLine from "../utils/HrLine";
import { Calendar } from "react-native-calendars";
import Actitivity from "../hooks/ActivityHook";
import { useData } from "../Context/Contexter";
import Api from "../Api";
import axios from "axios";
import { Dimensions } from "react-native";
import TopicsText from "../utils/TopicsText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

const YourActivity = () => {
  const { width } = Dimensions.get("window");
  const { user } = useData();
  useEffect(() => {
    getAllActivityDates();
  }, []);
  // get the activity dates
  const [dates, setDates] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const getAllActivityDates = async () => {
    const res = await axios.post(
      `${Api}/Activity/getAllActitvityDates/${user._id}`
    );
    if (res.data) {
      const markedDatesArray = res.data.map((date) => ({
        [date]: {
          marked: true,
        },
      }));
      const markedDates = Object.assign({}, ...markedDatesArray);
      setDates(markedDates);
    }
  };
  // get the particular date activities
  const [selectesDate, setSeletedDate] = useState("");

  const selectedDatefun = (date) => {
    getParticularDateActivities(date.dateString);
  };
  // get particuar date function
  const getParticularDateActivities = async (date) => {
    setSeletedDate(date);
    const res = await axios.post(
      `${Api}/Activity/getParticularDateActitvities/${user._id}`,
      { Date: date }
    );
    if (res.data) {
      setActivitiesList(res.data);
    } else {
      setActivitiesList([]);
    }
  };

  return (
    <View style={pageView}>
      {/* code icon  */}
      <FontAwesomeIcon
        icon={faCode}
        size={200}
        style={{
          position: "absolute",
          opacity: 0.8,
          color: Colors.veryLightGrey,
          alignSelf: "center",
          top: "60%",
        }}
      />
      {/* heading text */}
      <HeadingText text="Your Activities" />
      {/* calender preview */}
      <Calendar
        style={{ borderWidth: 0, width: "100%", height: "auto" }}
        markedDates={dates}
        onDayPress={selectedDatefun}
      />
      {/* list Activities */}
      <HrLine width="100%" />
      <ScrollView>
        <TopicsText text={selectesDate ? selectesDate : ""} />
        {activitiesList.map((item, index) => (
          <Text
            style={{
              // borderWidth: 1,
              padding: width * 0.03,
              fontSize: width * 0.04,
              color: Colors.white,
              marginBottom: 20,
              borderRadius: 5,
              backgroundColor: Colors.violet,
              letterSpacing: 1,
            }}
            key={index}
          >
            {index + 1}. {item.activityName}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default YourActivity;

const styles = StyleSheet.create({});
