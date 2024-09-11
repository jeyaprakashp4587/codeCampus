import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, pageView } from "../constants/Colors";
import TopicsText from "../utils/TopicsText";
import HrLine from "../utils/HrLine";
import Api from "../Api";
import axios from "axios";
import { useData } from "../Context/Contexter";
import RelativeTime from "../components/RelativeTime";
import { useNavigation } from "@react-navigation/native";
import useSocket from "../Socket/useSocket";
import useSocketEmit from "../Socket/useSocketEmit";

const Notifications = () => {
  const { user, setSelectedUser } = useData();
  const { width, height } = Dimensions.get("window");
  const Navigation = useNavigation();
  const [NotificationList, setNotificationsList] = useState();
  // ---- socket
  const socket = useSocket();
  const emitSocket = useSocketEmit(socket);
  //----
  const getNotifications = async () => {
    const res = await axios.get(
      `${Api}/Notifications/getNotifications/${user._id}`
    );
    if (res.data) {
      // console.log("Noti Console", res.data);
      setNotificationsList(res.data);
    }
  };
  useEffect(() => {
    getNotifications();
  }, []);
  // Notification Options
  const notiOpotions = [
    { name: "Friends" },
    { name: "Posts" },
    { name: "Others" },
  ];
  // HandleNotificationClick} -------
  const HandleNotificationClick = async (item) => {
    // Check if the notification is not seen
    if (!item.seen) {
      try {
        // Send request to update the notification as seen
        await axios.patch(
          `${Api}/Notifications/markAsSeen/${user._id}/${item._id}`
        );
        // Optionally, update the state to mark this item as seen locally
        setNotificationsList((prevList) =>
          prevList.map((notification) =>
            notification._id === item._id
              ? { ...notification, seen: true }
              : notification
          )
        );
        emitSocket("checkNotification", "");
      } catch (error) {
        console.log("Error marking notification as seen:", error);
      }
    }
    // Handle different types of notifications
    switch (item.NotificationType) {
      case "connection":
        Navigation.navigate("userprofile");
        setSelectedUser(item.NotificationSender);
        break;

      default:
        break;
    }
  };

  // -----
  return (
    <View style={pageView}>
      {/* heading */}
      <TopicsText text="Notifications" mb={5} />
      {/* hr line */}
      <HrLine margin={1} width="100%" />
      {/* Notification options */}
      {/* <View style={{ flexDirection: "row", columnGap: 20, marginTop: 10 }}>
        {notiOpotions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 6,
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ letterSpacing: 2 }}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View> */}
      {/* Notifications Sections */}
      {!NotificationList || NotificationList.length < 0 ? (
        <Text>No Notifications There</Text>
      ) : (
        NotificationList?.map((item, index) => (
          <TouchableOpacity
            onPress={() => HandleNotificationClick(item)}
            key={index}
            style={{
              // borderWidth: 1,
              padding: width * 0.06,
              borderRadius: 7,
              marginTop: 15,
              position: "relative",
              flexDirection: "row",
              alignItems: "center",
              columnGap: 20,
              backgroundColor: item?.seen ? "white" : Colors.veryLightGrey,
              // flexWrap: "wrap",
              elevation: 3,
            }}
          >
            <Image
              source={{ uri: item?.NotificationSenderProfile }}
              style={{
                width: width * 0.14,
                height: height * 0.07,
                borderRadius: 50,
              }}
            />
            <Text
              numberOfLines={2}
              style={{
                color: Colors.mildGrey,
                letterSpacing: 1,
                fontSize: width * 0.033,
                maxWidth: 250,
                lineHeight: 22,
              }}
            >
              {item.NotificationText}
            </Text>
            {/* show time */}
            <View
              style={{
                position: "absolute",
                bottom: height * 0.007,
                right: width * 0.05,
              }}
            >
              <RelativeTime time={item?.Time} />
            </View>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
