import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useData } from "../Context/Contexter";
import { Colors, font, pageView } from "../constants/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FontAwesome5 } from "@expo/vector-icons";
import Ripple from "react-native-material-ripple";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const SelectedCourse = ({ navigation }) => {
  const { selectedCourse } = useData();

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
      guidance: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/s6156ZBcfGk?si=iCIRRTcLVqOJ-mNp&amp;start=60" title="YouTube video player" frameborder="2" borderradius="10" allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
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
    },
  ];
  const [courseDetails, setCourseDetails] = useState();
  useEffect(() => {
    const filter = courses.filter((name) => name.name.includes(selectedCourse));
    // console.log(selectedCourse);
    setCourseDetails(...filter);
  }, []);
  // console.log("courses", courseDetails);
  return (
    <ScrollView style={styles.pageView} showsVerticalScrollIndicator={false}>
      <Text style={styles.courseName}>{courseDetails?.name}</Text>
      <Image source={{ uri: courseDetails?.img }} style={styles.courseImage} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Course Intro</Text>
        <Text style={styles.sectionText}>{courseDetails?.introduction}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technologies</Text>
        <View style={styles.technologiesContainer}>
          {courseDetails?.technologies.map((icon) => icon)}
        </View>
      </View>
      <Text style={styles.sectionTitle}>Road Map Guidance</Text>
      <View style={styles.webviewContainer}>
        <WebView
          source={{
            html: courseDetails?.guidance,
          }}
        />
      </View>
      <Ripple
        rippleColor={Colors.violet}
        rippleOpacity={1}
        style={styles.button}
        onPress={() => navigation.navigate("learn")}
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
    marginBottom: 10,
  },
  technologiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    columnGap: 30,
    // borderWidth: 1,
  },

  webviewContainer: {
    height: 200,
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
