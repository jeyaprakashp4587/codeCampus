import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Dimensions,
} from "react-native";
import React from "react";
import { Colors, pageView } from "../constants/Colors";
import { useData } from "../Context/Contexter";
import HeadingText from "../utils/HeadingText";
import TopicsText from "../utils/TopicsText";
import PragraphText from "../utils/PragraphText";
import axios from "axios";
import Api from "../Api";
import { Button } from "react-native-paper";
import Actitivity from "../hooks/ActivityHook";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const CourseDetails = ({ navigation }) => {
  const {
    selectedCourse,
    setselectedTechnology,
    selectedTechnology,
    user,
    setUser,
  } = useData();
  const navigation = useNavigation();

  const HandleCourse = useCallback(
    async (item) => {
      setLoading(true); // Start loading
      try {
        // Set the selected technology
        setselectedTechnology({ web: item.web, name: item.name });

        // Navigate to "learn" screen immediately
        navigation.navigate("learn");

        // Make the API request to add the course technology
        const res = await axios.post(`${Api}/Courses/addTech`, {
          TechName: item.name,
          CourseName: selectedCourse.name,
          UserId: user._id,
        });

        // Check the response
        if (res.data.Email) {
          setUser(res.data);
          Alert.alert("Success", "Course Added Successfully");

          // Log the activity if course is successfully added
          Actitivity(user._id, `${selectedCourse.name} Successfully Added.`);
        } else {
          Alert.alert("Error", res.data);
        }
      } catch (error) {
        // Catch and handle any errors
        console.error("Error adding course:", error);
        Alert.alert("Error", "Failed to add the course. Please try again.");
      } finally {
        // End loading state
        setLoading(false);
      }
    },
    [selectedCourse, setselectedTechnology, user, setUser, navigation]
  );

  return (
    <View style={styles.container}>
      <HeadingText text="Course Details" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={selectedCourse?.technologies}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.courseItem}>
            <View style={styles.iconContainer}>
              {React.cloneElement(item.icon, { size: 130 })}
            </View>
            <PragraphText text={item.details} />
            <View>
              <TopicsText text="Concepts" />
              {item.basics.map((basic, index) => (
                <Text key={index} style={styles.basicText}>
                  <Text style={styles.asterisk}> * </Text>
                  {basic}
                </Text>
              ))}
            </View>
            <Button
              onPress={() => HandleCourse(item)}
              textColor="white"
              style={{
                backgroundColor: "#7575a3",
                borderRadius: 10,
                width: "100%",
              }}
            >
              Start
            </Button>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  courseItem: {
    marginBottom: 50,
    padding: 10,
    rowGap: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.veryLightGrey,
  },
  iconContainer: {
    alignSelf: "center",
  },
  basicText: {
    color: Colors.mildGrey,
    fontSize: 16,
    lineHeight: 27,
    letterSpacing: 0.9,
    paddingVertical: 10,
  },
  asterisk: {
    color: "orange",
    fontWeight: "700",
    fontSize: 20,
  },
});

export default CourseDetails;
