import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { pageView } from "../constants/Colors";
import io from "socket.io-client";
import Api from "../Api";
import { useData } from "../Context/Contexter";

const MessageScreen = () => {
  const { user } = useData();
  const socket = io(Api, { query: { userId: user._id } });
  useEffect(() => {
    socket.on("connect", () => {
      // console.log("connecteed");
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <View style={pageView}>
      <Text>MessageScreen</Text>
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({});
