import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import HeadingText from "../utils/HeadingText";
import { Colors, pageView } from "../constants/Colors";
import { useData } from "../Context/Contexter";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Api from "../Api";

const YourCourses = () => {
  const { user, setUser } = useData();
  const color = [
    { color1: "#ffb3b3", color2: "#ffe6e6" },
    { color1: "#b3d9ff", color2: "#e6f2ff" },
    { color1: "#b3e6cc", color2: "#ecf9f2" },
    { color1: "#b3b3ff", color2: "#e6e6ff" },
    { color1: "#ffb3ff", color2: "#ffe6ff" },
    { color1: "#b3e6cc", color2: "#ecf9f2" },
    { color1: "#b3e6cc", color2: "#ecf9f2" },
    { color1: "#b3e6cc", color2: "#ecf9f2" },
  ];
  // remove the course
  const HandleRemoveCourse = async (crName) => {
    const res = await axios.post(`${Api}/Courses/removeCourse`, {
      userId: user._id,
      CourseName: crName,
    });
    if (res.data.Email) {
      setUser(res.data);
    }
  };
  return (
    <View style={pageView}>
      <HeadingText text="Your Courses" />
      {/* wrappers */}
      {user?.Courses.length <= 0 ? (
        <Text>You Have No Courses</Text>
      ) : (
        user.Courses.map((course, index) => (
          <LinearGradient
            colors={[color[index].color1, color[index].color2]}
            start={[0, 1]}
            end={[1, 0]}
            style={{ borderRadius: 10, marginBottom: 20 }}
          >
            <TouchableOpacity
              onLongPress={() => HandleRemoveCourse(course.Course_Name)}
              key={index}
              style={{
                width: "100%",
                height: "auto",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                padding: 30,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: Colors.veryDarkGrey,
                    letterSpacing: 1,
                  }}
                >
                  {course.Course_Name}
                </Text>
                {course.Technologies.map((tech) => (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 10,
                    }}
                  >
                    <Text
                      style={{
                        textTransform: "capitalize",
                        fontSize: 15,
                        letterSpacing: 1,
                      }}
                    >
                      {tech.TechName}
                    </Text>
                    <Text>{tech.Points} / 10</Text>
                  </View>
                ))}
              </View>
              <FontAwesomeIcon
                icon={faCode}
                color={Colors.veryLightGrey}
                size={50}
              />
            </TouchableOpacity>
          </LinearGradient>
        ))
      )}
    </View>
  );
};

export default YourCourses;

const styles = StyleSheet.create({});
