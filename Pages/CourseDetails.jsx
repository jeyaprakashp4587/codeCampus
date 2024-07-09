import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { Colors, pageView } from "../constants/Colors";
import { useData } from "../Context/Contexter";
import Ripple from "react-native-material-ripple";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import Button from "../utils/Button";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import HeadingText from "../utils/HeadingText";
import TopicsText from "../utils/TopicsText";
import PragraphText from "../utils/PragraphText";

const CourseDetails = ({ navigation }) => {
  const { selectedCourse, setselectedTechnology } = useData();

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
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {selectedCourse?.technologies.map((item, index) => (
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
                    style={{ color: "orange", fweight: "700", fontSize: 20 }}
                  >
                    {" "}
                    *{" "}
                  </Text>
                  {basic}
                </Text>
              ))}
            </View>
            <Button
              function={() => {
                navigation.navigate("learn");
                setselectedTechnology(item.web);
              }}
              bgcolor="#7575a3"
              text="Start"
              textColor="white"
              fweight="700"
              fsize={18}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({});
