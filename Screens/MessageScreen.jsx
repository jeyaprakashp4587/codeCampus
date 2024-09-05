import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { pageView } from "../constants/Colors";
import io from "socket.io-client";
import Api from "../Api";

const MessageScreen = () => {
  const socket = io(Api);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connecteed");
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
