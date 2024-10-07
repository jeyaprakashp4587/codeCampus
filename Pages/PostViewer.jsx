import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Posts from "../components/Posts";
import { useEffect } from "react";
import axios from "axios";
import Api from "../Api";
import { useData } from "../Context/Contexter";

const PostViewer = () => {
  const { selectedPost } = useData();
  console.log("id", selectedPost);
  useEffect(() => {
    const getPostDetail = async () => {
      const res = await axios.get(`${Api}/Post/getPostDetails/${selectedPost}`);
      if (res.data) {
        console.log(data);
      }
    };
    getPostDetail();
  }, []);
  return <View>{/* <Posts /> */}</View>;
};

export default PostViewer;

const styles = StyleSheet.create({});
