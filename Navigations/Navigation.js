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
import { useState } from "react";
import { useEffect } from "react";
import SignUp from "../LoginSystem/SignUp";
import Carrer from "../Pages/Carrer";
import SelectedCourse from "../Pages/SelectedCourse";
import LearnPage from "../Pages/LearnPage";
import CourseDetails from "../Pages/CourseDetails";
import ChooseChallenge from "../Pages/ChooseChallenge";
import ChallengeDetail from "../Pages/ChallengeDetail";
import YourCourses from "../Pages/YourCourses";
import YourRewards from "../Pages/YourReward";
import Search from "../Pages/Search";
import Placement from "../Screens/Placement";

// ------------- //
// Tab navigations

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarIconStyle: {
          color: Colors.lightGrey,
        },
        tabBarActiveTintColor: "#3385ff",
        tabBarInactiveTintColor: Colors.lightGrey,
        tabBarStyle: {
          height: 85,
          paddingBottom: 10,
          borderTopWidth: 0,
          backgroundColor: "white",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: -25,
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
            <FontAwesomeIcon icon={faHome} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Challenge"
        component={Challenge}
        options={{
          headerShadow: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="sword-cross"
              size={24}
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
            <FontAwesomeIcon icon={faPlus} color={Colors.white} size={24} />
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
        name="Placement"
        component={Placement}
        options={{
          headerShadow: false,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faSuitcase} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShadow: false,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUserGroup} color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
// stack navigations
const StackNavigations = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShadow: false }}
      />
      <Stack.Screen
        name="index"
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
        name="yourcarrer"
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
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="placement"
        component={Placement}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// --------------- //
const Navigation = (props) => {
  return <StackNavigations status={props.status} />;
};

export default Navigation;

const styles = StyleSheet.create({});
