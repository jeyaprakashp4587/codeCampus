import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { pageView } from "../constants/Colors";
import TopicsText from "../utils/TopicsText";
import HrLine from "../utils/HrLine";
import Api from "../Api";
import axios from "axios";
import { useData } from "../Context/Contexter";

const Notifications = ({ NotificationLength }) => {
  const { user } = useData();
  const [NotificationList, setNotificationsList] = useState();
  const getNotifications = async () => {
    const res = await axios.get(
      `${Api}/Notifications/getNotifications/${user._id}`
    );
    if (res.data) {
      console.log("Noti Console", res.data);
      setNotificationsList(res.data);
      NotificationLength(res.data.length);
    }
  };
  useEffect(() => {
    getNotifications();
  }, []);
  // -----
  return (
    <View style={pageView}>
      {/* heading */}
      <TopicsText text="Notifications" />
      {/* hr line */}
      <HrLine margin={1} width="100%" />
      {/* Notifications Sections */}
      {NotificationList?.length < 0 ? (
        <Text>No Notifications There</Text>
      ) : (
        <FlatList
          data={NotificationList}
          renderItem={(notification) => (
            <Text>{notification.item.NotificationText}</Text>
          )}
        />
      )}
      <Text> {NotificationList?.length}</Text>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
