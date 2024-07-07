import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { Colors, pageView } from "../constants/Colors";
import { useData } from "../Context/Contexter";
import Ripple from "react-native-material-ripple";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import Button from "../utils/Button";

const CourseDetails = () => {
  const { selectedCourse } = useData();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 5 }}
    >
      {selectedCourse?.technologies.map((item) => (
        <View
          style={{
            marginBottom: 50,
            borderWidth: 0,
            padding: 30,
            rowGap: 20,
            borderRadius: 5,
            // elevation: 3,
            backgroundColor: "white",
            margin: 10,
          }}
        >
          <View style={{ alignSelf: "center" }}>
            {React.cloneElement(item.icon, { size: 130 })}
          </View>
          <Text
            style={{
              color: Colors.mildGrey,
              fontSize: 16,
              lineHeight: 27,
              letterSpacing: 0.5,
            }}
          >
            {item.details}
          </Text>
          <View>
            <Text
              style={{
                color: Colors.mildGrey,
                fontWeight: 700,
                fontSize: 23,
                paddingBottom: 10,
              }}
            >
              Concepts
            </Text>
            {item.basics.map((basic) => (
              <Text
                style={{
                  color: Colors.mildGrey,
                  fontSize: 16,
                  lineHeight: 27,
                  letterSpacing: 0.9,
                  paddingVertical: 10,
                }}
              >
                * {basic}
              </Text>
            ))}
          </View>
          <Button
            bgcolor="#7575a3"
            text="Start"
            textColor="white"
            fweight="700"
            fsize={18}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({});
