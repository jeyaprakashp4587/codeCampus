import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { Colors, pageView } from "../constants/Colors";
import { useData } from "../Context/Contexter";
import Button from "../utils/Button";
import HeadingText from "../utils/HeadingText";
import TopicsText from "../utils/TopicsText";
import PragraphText from "../utils/PragraphText";
import axios from "axios";
import Api from "../Api";

const CourseDetails = ({ navigation }) => {
  const {
    selectedCourse,
    setselectedTechnology,
    selectedTechnology,
    user,
    setUser,
  } = useData();
  // console.log(selectedCourse);
  // console.log(selectedTechnology);
  const HandleCourse = async (item) => {
    // navigation.navigate("learn");
    setselectedTechnology({ web: item.web, name: item.name });
    const res = await axios.post(`${Api}/Courses/addTech`, {
      TechName: item.name,
      CourseName: selectedCourse.name,
      UserId: user._id,
    });
    if (res.data.Email) {
      setUser(res.data);
      Alert.alert("Course Added Succesfully");
    } else {
      Alert.alert(res.data);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}>
      <HeadingText text="Course Details" />
      {/* <FontAwesomeIcon
        icon={faCode}
        size={400}
        color={Colors.veryLightGrey}
        style={{
          position: "absolute",
          zIndex: -10,
          top: 350,
          alignSelf: "center",
        }}
      /> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={selectedCourse?.technologies}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              marginBottom: 50,
              borderWidth: 0,
              padding: 10,
              rowGap: 20,
              borderRadius: 5,
              // elevation: 3,
              // borderWidth: 1,
              borderColor: Colors.veryLightGrey,
              // margin: 10,
            }}
          >
            <View style={{ alignSelf: "center" }}>
              {React.cloneElement(item.icon, { size: 130 })}
            </View>
            <PragraphText text={item.details} />
            <View>
              <TopicsText text="Concepts" />
              {item.basics.map((basic, index) => (
                <Text
                  key={index}
                  style={{
                    color: Colors.mildGrey,
                    fontSize: 16,
                    lineHeight: 27,
                    letterSpacing: 0.9,
                    paddingVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "orange",
                      fweight: "700",
                      fontSize: 20,
                    }}
                  >
                    {" "}
                    *{" "}
                  </Text>
                  {basic}
                </Text>
              ))}
            </View>
            <Button
              function={() => HandleCourse(item)}
              bgcolor="#7575a3"
              text="Start"
              textColor="white"
              fweight="700"
              fsize={18}
              width="100%"
            />
          </View>
        )}
      />
    </View>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({});
