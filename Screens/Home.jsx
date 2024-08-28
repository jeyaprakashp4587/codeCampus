import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, pageView } from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import HomeSkeleton from "../Skeletons/HomeSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { EvilIcons } from "@expo/vector-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useData } from "../Context/Contexter";
import { Dimensions } from "react-native";
import Post from "../components/Posts";
import { LinearGradient } from "expo-linear-gradient";
import { RefreshControl } from "react-native";
import axios from "axios";
import Api from "../Api";
import ActivityHook from "../hooks/ActivityHook";
import Carousel from "react-native-reanimated-carousel";
// carousel images
import learnImg from "../assets/images/learn.png";
import practiceImg from "../assets/images/practice.png";
import achiveImg from "../assets/images/achive.png";

// code -----------

const { width, height } = Dimensions.get("window");
const Home = () => {
  const navigation = useNavigation();

  const { user, setUser } = useData();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 100);
  }, []);

  // refresh page
  const [refControl, setRefControl] = useState(false);
  const refreshUser = async () => {
    setRefControl(true);
    const res = await axios.post(`${Api}/Login/getUser`, { userId: user._id });
    if (res.data) {
      setUser(res.data);
      setRefControl(false);
    }
  };
  // load the skeleton
  if (!load) {
    return <HomeSkeleton />;
  }

  const carouel = [
    { name: "Learn", img: learnImg, bgColor: "#ffcccc" },
    {
      name: "Practice",
      img: practiceImg,
      bgColor: "#cce6ff",
    },
    { name: "Win", img: achiveImg, bgColor: "#b3ffb3" },
  ];
  // const carouel = new Array(10);

  return (
    <View style={[pageView, { paddingHorizontal: 15 }]}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("profile")}>
          <Image
            source={{ uri: user?.Images?.profile }}
            style={[
              styles.profileImage,
              {
                width: width * 0.12,
                height: width * 0.12,
                borderRadius: (width * 0.12) / 2,
                borderWidth: 1,
                // borderColor: "#404040",
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("search")}
          style={[styles.searchButton, { width: width * 0.66 }]}
        >
          <EvilIcons name="search" size={30} color={Colors.lightGrey} />
          <TextInput
            onPress={() => navigation.navigate("search")}
            placeholder="Search"
            style={styles.searchInput}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("message")}>
          <AntDesign name="message1" size={24} color={Colors.lightGrey} />
        </TouchableOpacity>
      </View>
      {/*  header*/}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refControl} onRefresh={refreshUser} />
        }
      >
        {/* ideas wrapper */}
        <View style={styles.ideasWrapper}>
          <TouchableOpacity
            style={styles.ideaBox}
            onPress={() => navigation.navigate("carrerScreen")}
          >
            <Image
              source={require("../assets/images/carrer.png")}
              style={[styles.icon, { tintColor: "#ff9999" }]}
            />
            <Text
              style={[styles.ideaText, { fontSize: width * 0.02 }]}
              numberOfLines={1}
            >
              Career
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("yourcourse")}
            style={styles.ideaBox}
          >
            <Image
              source={require("../assets/images/learning.png")}
              style={[styles.icon, { tintColor: "#8600b3" }]}
            />
            <Text
              numberOfLines={1}
              style={[styles.ideaText, { fontSize: width * 0.02 }]}
            >
              Your Course
            </Text>
          </TouchableOpacity>
          <View style={styles.ideaBox}>
            <Image
              source={{ uri: "https://i.ibb.co/5n0FQH4/submit.png" }}
              style={[styles.icon, { tintColor: "#006622" }]}
            />
            <Text
              numberOfLines={1}
              style={[styles.ideaText, { fontSize: width * 0.02 }]}
            >
              Assignment
            </Text>
          </View>
          <TouchableOpacity
            style={styles.ideaBox}
            onPress={() => navigation.navigate("youractivities")}
          >
            <Image
              source={require("../assets/images/calendar.png")}
              style={[styles.icon, { tintColor: "#0077b3" }]}
            />
            <Text
              style={[styles.ideaText, { fontSize: width * 0.02 }]}
              numberOfLines={1}
            >
              Your Activity
            </Text>
          </TouchableOpacity>
        </View>
        {/* carousel  */}
        <Carousel
          style={{ margin: "auto" }}
          width={width * 0.7}
          height={height * 0.23}
          data={carouel}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                // borderWidth: 0.5,
                elevation: 2,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <LinearGradient
                colors={["white", "white", item.bgColor]}
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                  // borderWidth: 0.4,
                  // borderRadius: 10,
                  padding: 20,
                  overflow: "hidden",
                }}
                start={[1, 0]}
                end={[0, 1]}
              >
                <Text
                  style={{
                    fontSize: width * 0.06,
                    textTransform: "capitalize",
                    color: Colors.lightGrey,
                    fontWeight: "700",
                    letterSpacing: 2,
                  }}
                >
                  {item.name}
                </Text>
                <Image
                  source={item.img}
                  style={{ width: "60%", height: "70%" }}
                />
              </LinearGradient>
            </View>
          )}
          mode="parallax"
          modeConfig={{
            stackInterval: 18,
            scaleInterval: 0.08,
            rotateZDeg: 15,
            translateX: -25,
          }}
          autoPlay={true}
          snapEnabled={true}
          autoPlayInterval={2000}
        />
        {/* post */}
        <View></View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  calendar: {
    position: "absolute",
    zIndex: 10,
    elevation: 5,
    borderRadius: 5,
    padding: 10,
  },
  activityList: {
    position: "absolute",
    zIndex: 90,
    backgroundColor: "white",
    elevation: 5,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    marginTop: 10,
  },
  profileImage: {
    borderRadius: 50,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: Colors.veryLightGrey,
  },
  searchInput: {
    color: Colors.lightGrey,
    fontSize: 16,
    paddingHorizontal: 10,
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  ideasWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    padding: 5,
    // borderWidth: 1,
  },
  ideaBox: {
    width: width * 0.2,
    height: height * 0.1,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    rowGap: 7,
  },
  icon: {
    width: 35,
    height: 35,
  },
  ideaText: {
    color: Colors.veryDarkGrey,
    letterSpacing: 0.5,
    // fontSize: 20,
  },
});
