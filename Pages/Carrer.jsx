import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors, font, pageView } from "../constants/Colors";
import { useData } from "../Context/Contexter";

const Carrer = ({ navigation }) => {
  // courses list
  const { setSelectedCourse } = useData();

  const Courses = [
    {
      CourseName: "Front End Development",
      bgColor: "#b8b894",
    },
    {
      CourseName: "Back End Development",
      bgColor: "#008080",
    },
    {
      CourseName: "App Development",
      bgColor: "#8cb3d9",
    },
    {
      CourseName: "Java",
      bgColor: "#b3b3ff",
    },
    {
      CourseName: "C++",
      bgColor: "#ff6666",
    },
    {
      CourseName: "Python",
      bgColor: "#8c1aff",
    },
  ];
  return (
    <View style={pageView}>
      <Text
        style={{
          fontFamily: font.poppins,
          color: Colors.mildGrey,
          fontSize: 25,
          padding: 20,
        }}
      >
        Choose Your Learning Carrer
      </Text>
      {/* <ScrollView style={{ borderWidth: 0, flex: 1 }}> */}
      <Image
        source={require("../assets/images/carrer.jpeg")}
        style={{ width: 250, height: 250, alignSelf: "center" }}
      />
      <View
        style={{
          //   borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: 10,
          gap: 35,
          marginTop: 20,
        }}
      >
        {Courses.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("course");
              setSelectedCourse(item.CourseName);
            }}
            key={index}
            style={{
              width: 170,
              height: 120,
              // borderWidth: 1,
              backgroundColor: item.bgColor,
              elevation: 7,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                fontFamily: font.poppins,
                color: "white",
                textAlign: "center",
                fontSize: 16,
                letterSpacing: 0.9,
              }}
            >
              {item.CourseName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* </ScrollView> */}
      <Text
        style={{
          textAlign: "center",
          padding: 20,
          fontSize: 15,
          //   textDecorationLine: "underline",
          color: Colors.lightGrey,
          fontFamily: font.poppins,
        }}
      >
        Other Courses will be added soon!
      </Text>
    </View>
  );
};

export default Carrer;

const styles = StyleSheet.create({});
