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
import Ripple from "react-native-material-ripple";
import Api from "../Api";
import axios from "axios";
import { useData } from "../Context/Contexter";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import RelativeTime from "./RelativeTime";

const Posts = ({ post, index, admin, updateLikeCount }) => {
  const { width, height } = Dimensions.get("window");
  const initialText = post.item?.PostText || post.PostText;
  const { user, setUser } = useData();
  const wordThreshold = 20;
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Function to count words in a string
  const countWords = (text) => text?.trim().split(/\s+/).length;

  // delete disp state
  const [deldisplay, setDeldisplay] = useState(false);

  const handleDelDisp = () => {
    setDeldisplay((prev) => !prev);
  };

  // handle Delete
  const HandleDelete = async (postId) => {
    try {
      const res = await axios.post(`${Api}/Post/deletePost/${user._id}`, {
        postId: postId,
      });
      if (res.data) {
        setUser(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // like
  const [likeCount, setLikeCount] = useState(post?.item?.Like || post?.Like);

  const handleLike = async () => {
    try {
      const res = await axios.post(
        `${Api}/Post/likePost/${post.item?._id || post._id}`
      );
      if (res.status === 200) {
        setLikeCount(likeCount + 1);
        updateLikeCount(post?.item?.Like || post?.Like, likeCount + 1);
      }
    } catch (error) {
      console.error("Error liking the post", error);
    }
  };

  return (
    <View
      key={index}
      style={{
        height: "auto",
        marginTop: 20,
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "white",
        marginBottom: 10,
        marginHorizontal: 5,
        position: "relative",
      }}
    >
      {/* Post Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          source={{}}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <Text
            style={{
              fontSize: width * 0.044,
              color: Colors.veryDarkGrey,
              fontFamily: font.poppins,
              letterSpacing: 1,
            }}
          >
            {post.item?.firstName
              ? post.item.firstName + post.item.LastName
              : post.firstName + post.LastName}
          </Text>
          <Text
            style={{
              fontSize: width * 0.033,
              color: Colors.lightGrey,
              fontFamily: font.poppins,
            }}
          >
            {post.item?.Institute || post.Institute}
          </Text>
        </View>
        {admin && (
          <TouchableOpacity onPress={handleDelDisp}>
            <Image
              source={{ uri: "https://i.ibb.co/nn25gZN/menu.png" }}
              style={{ width: 20, height: 20, tintColor: Colors.lightGrey }}
            />
          </TouchableOpacity>
        )}
        {/* Delete Section */}
        {deldisplay && (
          <TouchableOpacity
            onPress={() => HandleDelete(post.item?._id || post._id)}
            style={{
              position: "absolute",
              right: width * 0.03,
              top: height * 0.07,
              backgroundColor: "orange",
              borderRadius: 4,
              zIndex: 100,
            }}
          >
            <Text
              style={{
                color: "white",
                letterSpacing: 1,
                paddingHorizontal: 15,
                paddingVertical: 5,
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Post Text */}
      <Text
        style={{
          fontFamily: font.poppins,
          fontSize: width * 0.04,
          marginTop: 10,
          color: Colors.mildGrey,
        }}
      >
        {expanded
          ? initialText
          : `${initialText.split(" ").slice(0, wordThreshold).join(" ")}...`}
      </Text>
      {countWords(initialText) > wordThreshold && (
        <TouchableOpacity onPress={toggleExpanded} style={styles.showMore}>
          <Text style={{ color: "#595959" }}>
            {expanded ? "Show less" : "Show more"}
          </Text>
        </TouchableOpacity>
      )}
      <Text style={{ color: Colors.violet }}>
        {post.item?.PostLink ? post.item?.PostLink : post?.PostLink}
      </Text>

      {/* Post Image */}
      {post.item?.Images ||
        (post?.Images && (
          <FlatList
            data={post?.item?.Images ? post.item?.Images : post?.Images}
            horizontal
            renderItem={({ item, index }) => (
              <Image
                key={index}
                source={{ uri: item }}
                style={{
                  width:
                    post.item?.Images.length === 1 ? width * 0.84 : width * 0.8,
                  height: height * 0.3,
                  resizeMode: "contain",
                  borderWidth: 1,
                }}
              />
            )}
          />
        ))}

      {/* Post Footer */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 5,
          paddingTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={handleLike}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ fontFamily: font.poppins, fontSize: width * 0.04 }}>
            {likeCount}
          </Text>
          <FontAwesomeIcon size={20} icon={faHeart} color={Colors.mildGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <Text style={{ fontFamily: font.poppins, fontSize: width * 0.04 }}>
            12
          </Text>
          <FontAwesomeIcon
            icon={faComments}
            size={22}
            color={Colors.mildGrey}
          />
        </TouchableOpacity>

        <RelativeTime
          time={post.item?.Time || post.Time}
          fsize={width * 0.033}
        />
      </View>
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  showMore: {
    marginTop: 5,
  },
});
