import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { pageView } from "../constants/Colors";
import io from "socket.io-client";
import Api from "../Api";
import { useData } from "../Context/Contexter";
import NotificationsHook from "../Notification/NotificationsHook";

const MessageScreen = () => {
  const { user } = useData();
  const { sendLocalNotification } = NotificationsHook();
  // useEffect(() => {
  //   sendLocalNotification({ text: "hii" });
  // }, []);
  return (
    <View style={pageView}>
      <Text>Under Working!</Text>
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({});
