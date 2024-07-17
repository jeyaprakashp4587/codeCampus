import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { Colors, pageView } from "../constants/Colors";
import HeadingText from "../utils/HeadingText";
import { useData } from "../Context/Contexter";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import Skeleton from "../Skeletons/Skeleton";
const LearnPage = () => {
  const { selectedTechnology } = useData();
  // time
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;

    if (hours > 0 || minutes > 0 || seconds > 0) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [hours, minutes, seconds]);
  return (
    <View style={[pageView]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <HeadingText text="Study Area" />
        <View style={{ flexDirection: "row", columnGap: 10 }}>
          <SimpleLineIcons name="note" size={22} color={Colors.mildGrey} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="timer-outline"
              size={24}
              color={Colors.mildGrey}
            />
            <Text
              style={{
                borderWidth: 0,
                minWidth: 70,
                textAlign: "left",
                color: "orange",
              }}
            >
              {" "}
              {hours}:{minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ height: 20 }} />
      {selectedTechnology ? (
        <WebView source={{ uri: selectedTechnology.web }} />
      ) : (
        <Skeleton widht={200} height={200} />
      )}
    </View>
  );
};

export default LearnPage;

const styles = StyleSheet.create({});
