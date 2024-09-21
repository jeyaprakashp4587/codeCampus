import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Colors, font } from "../constants/Colors";
import { faComments, faHeart } from "@fortawesome/free-regular-svg-icons";
import { Dimensions } from "react-native";
import axios from "axios";
import { useData } from "../Context/Contexter";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import RelativeTime from "./RelativeTime";
import Api from "@/Api";

const Posts = ({ post, index, admin, senderDetails }) => {
  const { width, height } = Dimensions.get("window");
  const initialText = post?.PostText; // Fixing the data access here
  const { user, setUser } = useData();
  const wordThreshold = 20;
  const [expanded, setExpanded] = useState(false);
  const [deldisplay, setDeldisplay] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.Like);
  const [liked, setLiked] = useState(
    post?.LikedUsers?.some((likeuser) => likeuser?.LikedUser === user?._id)
  );

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const countWords = (text) => text?.trim().split(/\s+/).length;

  const handleDelDisp = () => {
    setDeldisplay((prev) => !prev);
  };

  const HandleDelete = async (postId) => {
    try {
      const res = await axios.post(`${Api}/Post/deletePost/${user?._id}`, {
        postId,
      });
      if (res.data) {
        setUser(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLikeToggle = async () => {
    if (liked) {
      await handleUnlike(post?._id);
    } else {
      await handleLike(post?._id);
    }
  };

  const handleLike = async (postId) => {
    setLiked(true);
    try {
      const response = await axios.post(`${Api}/Post/likePost/${postId}`, {
        userId: user?._id,
      });
      if (response.status === 200) {
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      setLiked(false);
    }
  };

  const handleUnlike = async (postId) => {
    setLiked(false);
    try {
      const res = await axios.post(`${Api}/Post/unlikePost/${postId}`, {
        userId: user._id,
      });
      if (res.status === 200) {
        setLikeCount((prev) => prev - 1);
      }
    } catch (error) {
      setLiked(true);
    }
  };

  return (
    <View
      key={index}
      style={{
        marginTop: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: "white",
        marginBottom: 10,
        elevation: 3,
        marginHorizontal: 5,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Image
          source={{
            uri: senderDetails?.Images
              ? senderDetails?.Images?.profile
              : user?.Images?.profile,
          }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <Text style={styles.userName}>
            {senderDetails?.firstName + senderDetails?.LastName}
          </Text>
          <Text style={styles.instituteText}>{post.Institute}</Text>
        </View>
        {admin && (
          <TouchableOpacity onPress={handleDelDisp}>
            <Image
              source={{ uri: "https://i.ibb.co/nn25gZN/menu.png" }}
              style={{ width: 20, height: 20, tintColor: Colors.lightGrey }}
            />
          </TouchableOpacity>
        )}
        {deldisplay && (
          <TouchableOpacity
            onPress={() => HandleDelete(post._id)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.postText}>
        {expanded
          ? initialText
          : `${initialText?.split(" ").slice(0, wordThreshold).join(" ")}...`}
      </Text>
      {countWords(initialText) > wordThreshold && (
        <TouchableOpacity onPress={toggleExpanded} style={styles.showMore}>
          <Text style={{ color: "#595959" }}>
            {expanded ? "Show less" : "Show more"}
          </Text>
        </TouchableOpacity>
      )}

      {post?.Images && (
        <FlatList
          data={post?.Images}
          horizontal
          renderItem={({ item, index }) => (
            <Image
              key={index}
              source={{ uri: item }}
              style={{
                width: post.Images.length === 1 ? width * 0.84 : width * 0.8,
                height: height * 0.3,
                resizeMode: "contain",
                borderWidth: 1,
              }}
            />
          )}
        />
      )}

      <View style={styles.postFooter}>
        <TouchableOpacity onPress={handleLikeToggle} style={styles.likeButton}>
          <Text style={{ fontFamily: font.poppins, fontSize: width * 0.048 }}>
            {likeCount}
          </Text>
          <FontAwesomeIcon
            size={18}
            icon={faHeart}
            color={liked ? "red" : Colors.mildGrey}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.commentButton}>
          <Text style={{ fontFamily: font.poppins, fontSize: width * 0.048 }}>
            12
          </Text>
          <FontAwesomeIcon
            icon={faComments}
            size={22}
            color={Colors.mildGrey}
          />
        </TouchableOpacity>

        <RelativeTime time={post.Time} fsize={width * 0.033} />
      </View>
    </View>
  );
};

export default Posts;
const styles = StyleSheet.create({
  userName: {
    fontSize: 16,
    color: Colors.veryDarkGrey,
    fontFamily: font.poppins,
    letterSpacing: 1,
  },
  instituteText: {
    fontSize: 14,
    color: Colors.lightGrey,
    fontFamily: font.poppins,
  },
  deleteButton: {
    position: "absolute",
    right: 20,
    top: 70,
    backgroundColor: "orange",
    borderRadius: 4,
    zIndex: 100,
  },
  deleteText: {
    color: "white",
    letterSpacing: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  postText: {
    fontFamily: font.poppins,
    fontSize: 14,
    marginTop: 10,
    color: Colors.mildGrey,
  },
  showMore: {
    marginTop: 5,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
    paddingTop: 10,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 3,
  },
  commentButton: {
    flexDirection: "row",
    columnGap: 5,
  },
});
