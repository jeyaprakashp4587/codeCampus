import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Colors, pageView } from "../constants/Colors";
import { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import HomeSkeleton from "../Skeletons/HomeSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { EvilIcons } from "@expo/vector-icons";
import Posts from "../components/Posts";
import { Calendar } from "react-native-calendars";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useData } from "../Context/Contexter";

const Home = () => {
  const navigation = useNavigation();
  const { user } = useData();
  // console.log(user);
  // initialize skeleton effect
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 100);
  }, []);
  // calender display
  const [calendardis, setCalenderdis] = useState(false);
  const [act, setActdate] = useState();
  const [activitiesdis, setActivitiesDis] = useState(false);
  const [activitieslist, setActivitiesList] = useState();

  // show user activity functions
  const activityobg = [
    {
      timestamp: "2024-07-05T12:34:56Z",
      course: ["react", "css", "html"],
    },
    {
      timestamp: "2024-07-09T12:34:56Z",
      course: ["java script"],
    },
  ];

  useEffect(() => {
    const fot = formatActivitiesForCalendar(activityobg);
    setActdate(fot);
  }, []);
  const formatActivitiesForCalendar = (activities) => {
    const formatted = {};
    activities.forEach((activity) => {
      const date = activity.timestamp.split("T")[0];
      if (!formatted[date]) {
        formatted[date] = {
          customStyles: {
            container: {
              backgroundColor: "yellow",
            },
            text: {
              color: "black",
              fontWeight: "bold",
            },
          },
        };
        formatted[date] = { marked: true, dots: [], course: [] };
      }
      formatted[date].dots.push({ color: "red" });
      formatted[date].course.push(...activity.course);
    });

    return formatted;
  };
  // render skeleton
  if (!load) {
    // console.log(load);
    return <HomeSkeleton />;
  }
  return (
    <View style={pageView}>
      {/* calender component for absolute */}
      <Calendar
        style={{
          position: "absolute",
          zIndex: 10,
          top: 200,
          width: 250,
          // height: 100,
          left: 150,
          elevation: 5,
          borderRadius: 5,
          padding: 10,
          display: calendardis ? "flex" : "none",
        }}
        markedDates={act}
        markingType={"multi-dot"}
        onDayPress={(day) => {
          setActivitiesDis(!activitiesdis);
          // console.log("act", act[day.dateString].course);
          setActivitiesList(act[day.dateString].course);
        }}
      />
      <View
        style={{
          // borderWidth: 1,
          width: 150,
          height: 200,
          position: "absolute",
          zIndex: 90,
          backgroundColor: "white",
          elevation: 5,
          alignSelf: "center",
          top: "40%",
          display: activitiesdis ? "flex" : "none",
        }}
      >
        <FlatList
          data={activitieslist}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      </View>
      {/* calender end */}
      {/* home header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 15,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("profile")}>
          <Image
            source={require("../assets/images/pr.png")}
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
        </TouchableOpacity>
        {/* search button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("search")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: Colors.veryLightGrey,
            width: "73%",
            // padding: 10,
            paddingHorizontal: 10,
            borderRadius: 13,
          }}
        >
          <EvilIcons name="search" size={30} color={Colors.lightGrey} />
          <TextInput
            onPress={() => navigation.navigate("search")}
            placeholder="Search"
            style={{
              color: Colors.lightGrey,
              fontSize: 16,
              paddingHorizontal: 10,
              // borderWidth: 1,
              flex: 1,
              padding: 10,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("message")}>
          <AntDesign name="message1" size={24} color={Colors.lightGrey} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ideas wrapper */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
            padding: 5,
          }}
        >
          <TouchableOpacity
            style={styles.ideaBox}
            onPress={() => navigation.navigate("carrerScreen")}
          >
            <Image
              source={require("../assets/images/carrer.png")}
              style={{ width: 35, height: 35, tintColor: "#52527a" }}
            />
            <Text
              style={{
                color: Colors.veryDarkGrey,
                fontSize: 10,
                // fontFamily: "PopIns-Regular",
                // fontWeight: 700,
              }}
              numberOfLines={1}
            >
              Career
            </Text>
          </TouchableOpacity>
          <View style={styles.ideaBox}>
            <Image
              source={require("../assets/images/learning.png")}
              style={{ width: 35, height: 35, tintColor: "orange" }}
            />
            <Text
              style={{
                color: Colors.veryDarkGrey,
                fontSize: 10,
                // fontWeight: 700,
              }}
            >
              Your Course
            </Text>
          </View>
          <View style={styles.ideaBox}>
            <Image
              source={require("../assets/images/reward.png")}
              style={{ width: 35, height: 35, tintColor: "#006622" }}
            />
            <Text
              numberOfLines={1}
              style={{
                color: Colors.veryDarkGrey,
                fontSize: 10,

                // fontFamily: "PopIns-Regular",
                // fontWeight: 700,
              }}
            >
              Rewards
            </Text>
          </View>
          <TouchableOpacity
            style={styles.ideaBox}
            onPress={() => setCalenderdis(!calendardis)}
          >
            {calendardis ? (
              <FontAwesomeIcon icon={faTimesCircle} size={30} color="#006666" />
            ) : (
              <Image
                source={require("../assets/images/calendar.png")}
                style={{ width: 35, height: 35, tintColor: "#006666" }}
              />
            )}
            <Text
              style={{
                color: Colors.veryDarkGrey,
                fontSize: 10,
              }}
              numberOfLines={1}
            >
              Your Activity
            </Text>
          </TouchableOpacity>
          {/* display: calendardis ? "flex" : "none"  */}
        </View>
        {/* posts */}
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  ideaBox: {
    width: "21%",
    height: 75,
    // borderWidth: 1,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 5,
    padding: 10,
  },
});
