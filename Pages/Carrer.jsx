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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const Carrer = ({ navigation }) => {
  // courses list
  const { setSelectedCourse } = useData();
  const courses = [
    {
      name: "Front End Development",
      introduction:
        "Learn to create engaging and responsive web interfaces using HTML, CSS, and JavaScript. Master popular frameworks like React, Bootstrap",
      technologies: [
        <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        <FontAwesome5 name="react" size={35} color="#9EE6F7" />,
        <FontAwesome5 name="bootstrap" size={35} color="#A983FF" />,
      ],
      topics: [
        "HTML Basics",
        "CSS Styling",
        "JavaScript Fundamentals",
        "Responsive Design",
        "State Management",
        "Component-based Architecture",
      ],
      img: "https://i.ibb.co/vzxBjQM/webdevelopment.jpg",
      guidance: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/s6156ZBcfGk?si=iCIRRTcLVqOJ-mNp&amp;start=60" title="YouTube video player" frameborder="0" borderradius="10" allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      bgColor: "#b8b894",
      platform: [],
    },
    {
      name: "Back End Development",
      introduction:
        "Discover server-side programming with Node.js, Express, Mongo DB, and more. Build REST APIs, manage databases, and implement authentication.",
      technologies: [
        <FontAwesome5 name="node" size={35} color="#46473D" />,
        <MaterialCommunityIcons
          name="microsoft-internet-explorer"
          size={35}
          color="#414141"
        />,
        <Fontisto name="mongodb" size={35} color="#72B545" />,
      ],
      topics: [
        "Server-side Programming",
        "RESTful APIs",
        "Database Integration",
        "Authentication & Authorization",
        "Middleware",
        "Microservices",
      ],
      img: "https://i.ibb.co/frB3LrD/11668623-20945227.jpg",
      guidance: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/G-EAVcMHEko?si=h-WzoTp5lCQ7idun" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      bgColor: "#008080",
    },
    {
      name: "App Development",
      introduction:
        "Develop high-quality mobile applications with Swift, Kotlin, Flutter, and React Native. Focus on UI design, state management, and cross-platform solutions.",
      technologies: [
        <FontAwesome5 name="swift" size={35} color="#DF833A" />,
        <FontAwesome5 name="react" size={35} color="#4CC1E0" />,
        <MaterialCommunityIcons
          name="language-kotlin"
          size={35}
          color="#70D152"
        />,
      ],
      topics: [
        "Mobile UI Design",
        "State Management",
        "APIs and Networking",
        "Cross-platform Development",
        "App Store Deployment",
        "Performance Optimization",
      ],
      img: "https://i.ibb.co/Lvvq3kP/appdevelopment.jpg",
      guidance: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/fwdiH3343oM?si=_7dmKfgbpqvCGnKT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      bgColor: "#8cb3d9",
    },
    {
      name: "Java",
      introduction:
        "Gain expertise in Java for enterprise-level applications. Cover OOP, data structures, concurrency, and frameworks like Spring and Hibernate.",
      technologies: [<FontAwesome5 name="java" size={35} color="#158EC9" />],
      topics: [
        "Object-oriented Programming",
        "Data Structures",
        "Java Collections Framework",
        "Exception Handling",
      ],
      img: "https://i.ibb.co/qFbgSNf/java.jpg",
      guidance: `<iframe width="100%" height="100%"src="https://www.youtube.com/embed/vgm6AJLu6F4?si=1Oxz5wM2q8RNw7a5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      bgColor: "#b3b3ff",
    },
    {
      name: "C++",
      introduction:
        "Master C++ programming for performance-critical applications. Learn advanced topics like templates, STL, memory management, and multithreading.",
      technologies: [
        <MaterialCommunityIcons
          name="language-cpp"
          size={35}
          color="#085E9F"
        />,
      ],
      topics: [
        "Object-oriented Programming",
        "Templates",
        "Standard Template Library (STL)",
        "Memory Management",
        "Multithreading",
        "Advanced Data Structures",
      ],
      img: "https://i.ibb.co/JRXrmhX/7441053-3657405.jpg",
      guidance: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/x0xjvTIvmT4?si=D5w0dGGvYHI0k8fS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      bgColor: "#ff6666",
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
        {courses.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("course");
              setSelectedCourse(item);
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
              {item.name}
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
