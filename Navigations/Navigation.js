import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../LoginSystem/Login";
import Home from "../Screens/Home";
import Profile from "../Screens/Profile";
import { Colors, font } from "../constants/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBell,
  faHome,
  faPlus,
  faSuitcase,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import Post from "../Screens/Post";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Challenge from "../Screens/Challenge";
import MessageScreen from "../Screens/MessageScreen";
import SignUp from "../LoginSystem/SignUp";
import Carrer from "../Pages/Carrer";
import SelectedCourse from "../Pages/SelectedCourse";
import LearnPage from "../Pages/LearnPage";
import CourseDetails from "../Pages/CourseDetails";
import ChooseChallenge from "../Pages/ChooseChallenge";
import ChallengeDetail from "../Pages/ChallengeDetail";
import YourCourses from "../Pages/YourCourses";
import YourRewards from "../Pages/YourReward";
import Placement from "../Screens/Placement";
import SplashScreen from "../Splashscreen/SplashScreen";
import { Dimensions } from "react-native";
import YourChallenges from "../Pages/YourChallenges";
import YourActivity from "../Pages/YourActivity";
import UserProfile from "../Pages/UserProfile";
import Notifications from "../Pages/Notifications";
import SearchScreen from "../Pages/SearchScreen";
import Assignment from "../Pages/Assignments";
import PostViewer from "../Pages/PostViewer";
import ChallengeViewer from "../Pages/ChallengeViewer";
import AssignmentPlayGround from "../Pages/AssignmentPlayGround";

// Tab navigations
const { width, height } = Dimensions.get("window");

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator
      detachInactiveScreens={true}
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarIconStyle: {
          color: Colors.lightGrey,
        },
        tabBarActiveTintColor: "#3385ff",
        tabBarInactiveTintColor: Colors.lightGrey,
        tabBarStyle: {
          height: height * 0.1,
          paddingBottom: 10,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: -15,
          marginBottom: 5,
          fontFamily: font.poppins,
          color: Colors.veryDarkGrey,
          letterSpacing: 1,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShadow: false,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faHome} color={color} size={width * 0.06} />
          ),
        }}
      />
      <Tab.Screen
        name="Challenges"
        component={Challenge}
        options={{
          headerShadow: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="sword-cross"
              size={width * 0.06}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          headerShadow: false,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon
              icon={faPlus}
              color={Colors.white}
              size={width * 0.06}
            />
          ),
          tabBarIconStyle: {
            backgroundColor: "#3385ff",
            width: 70,
            height: 70,
            borderRadius: 40,
            position: "absolute",
            top: -35,
            elevation: 1,
            borderWidth: 4,
            borderColor: "white",
          },
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={Placement}
        options={{
          headerShadow: false,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon
              icon={faSuitcase}
              color={color}
              size={width * 0.06}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShadow: false,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon
              icon={faUserGroup}
              color={color}
              size={width * 0.06}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Stack navigations
const StackNavigations = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      // initialRouteName="splash"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="splash"
        component={SplashScreen}
        options={{ headerShadow: false }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShadow: false }}
      />
      <Stack.Screen
        name="Tab"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{ headerShadow: false }}
      />
      <Stack.Screen
        name="signup"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="message"
        component={MessageScreen}
        options={{ headerShadow: false }}
      />
      <Stack.Screen
        name="carrerScreen"
        component={Carrer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="course"
        component={SelectedCourse}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="learn"
        component={LearnPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="courseDetails"
        component={CourseDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="chooseChallenge"
        component={ChooseChallenge}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="challengeDetail"
        component={ChallengeDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="yourcourse"
        component={YourCourses}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="yourrewards"
        component={YourRewards}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="placement"
        component={Placement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="yourchallenges"
        component={YourChallenges}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="youractivities"
        component={YourActivity}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="userprofile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Assignments"
        component={Assignment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Postviewer"
        component={PostViewer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChallengeViewer"
        component={ChallengeViewer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AssignmentPlayGround"
        component={AssignmentPlayGround}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigations;

const styles = StyleSheet.create({});
