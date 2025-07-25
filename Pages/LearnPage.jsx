import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { Colors, pageView } from "../constants/Colors";
import HeadingText from "../utils/HeadingText";
import { useData } from "../Context/Contexter";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import Skeleton from "../Skeletons/Skeleton";

const { width, height } = Dimensions.get("window");

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
    <View style={styles.container}>
      <View style={styles.header}>
        <HeadingText text="Study Area" />
        <View style={styles.headerRight}>
          <SimpleLineIcons
            name="note"
            size={width * 0.06}
            color={Colors.mildGrey}
          />
          <View style={styles.timerContainer}>
            <MaterialCommunityIcons
              name="timer-outline"
              size={width * 0.06}
              color={Colors.mildGrey}
            />
            <Text style={styles.timerText}>
              {hours}:{minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ height: height * 0.02 }} />
      {selectedTechnology ? (
        <WebView
          source={{ uri: selectedTechnology.web }}
          style={styles.webview}
        />
      ) : (
        <Skeleton width={width * 0.5} height={height * 0.25} />
      )}
    </View>
  );
};

export default React.memo(LearnPage);

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: width * 0.05,
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05,
  },
  headerRight: {
    flexDirection: "row",
    columnGap: width * 0.025,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    borderWidth: 0,
    minWidth: width * 0.2,
    textAlign: "left",
    color: "orange",
    fontSize: width * 0.045,
  },
  webview: {
    height: height * 0.75,
  },
});
