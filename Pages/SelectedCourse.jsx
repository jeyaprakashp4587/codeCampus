import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useData } from "../Context/Contexter";
import { Colors, font, pageView } from "../constants/Colors";
import Skeleton from "../Skeletons/Skeleton";
import Ripple from "react-native-material-ripple";
import TopicsText from "../utils/TopicsText";
import PragraphText from "../utils/PragraphText";
import Api from "../Api";
import axios from "axios";

const SelectedCourse = ({ navigation }) => {
  const { selectedCourse, user, setUser } = useData();
  // Handle Add Course
  const HandleAddCourse = async () => {
    // console.log(selectedCourse);
    const res = await axios.post(`${Api}/Courses/addCourse`, {
      courseName: selectedCourse.name,
      userId: user._id,
    });
    // console.log(res.data);
    if (res.data.Email) {
      setUser(res.data);
      Alert.alert("Course Added Succesfully");
    } else {
      Alert.alert(res.data);
    }
    navigation.navigate("courseDetails");
  };
  return (
    <ScrollView style={styles.pageView} showsVerticalScrollIndicator={false}>
      <Text style={styles.courseName}>{selectedCourse?.name}</Text>
      {selectedCourse?.img ? (
        <Image
          source={{ uri: selectedCourse?.img }}
          style={styles.courseImage}
        />
      ) : (
        <Skeleton widht={200} height={250} />
      )}
      <View style={styles.section}>
        <TopicsText text="Course Intro" />
        <PragraphText text={selectedCourse?.introduction} />
      </View>
      <View style={styles.section}>
        <TopicsText text="Technologies" />
        <View style={styles.technologiesContainer}>
          {selectedCourse?.technologies.map((icon, index) => (
            <TouchableOpacity key={index}>{icon.icon}</TouchableOpacity>
          ))}
        </View>
      </View>
      {/* learing platforms */}

      <Ripple
        rippleColor={Colors.violet}
        rippleOpacity={1}
        style={styles.button}
        onPress={() => HandleAddCourse()}
      >
        <Text style={styles.buttonText}>Let's Begin</Text>
      </Ripple>
    </ScrollView>
  );
};

export default SelectedCourse;

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff", // Adjust as necessary
  },
  courseName: {
    fontSize: 25,
    color: Colors.mildGrey,
    fontFamily: font.poppins,
    marginBottom: 20,
  },
  courseImage: {
    width: "90%",
    height: 250,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 20,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    color: Colors.mildGrey,
    fontSize: 23,
    paddingVertical: 10,
  },
  sectionText: {
    color: Colors.lightGrey,
    fontSize: 15,
    letterSpacing: 0.8,
    lineHeight: 30,
  },
  technologiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    columnGap: 30,
    // borderWidth: 1,
  },

  webviewContainer: {
    height: 250,
    // borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 30,
    alignSelf: "center",
    width: "100%",
  },
  button: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    borderColor: "#004080",
    elevation: 2,
    width: 200,
    alignSelf: "center",
    backgroundColor: "white",
    borderWidth: 1,
    marginTop: 30,
    marginBottom: 30,
  },
  buttonText: {
    color: Colors.mildGrey,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
