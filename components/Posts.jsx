import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Colors, font } from "../constants/Colors";
import {
  faComment,
  faCommentDots,
  faComments,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { Dimensions } from "react-native";
import Ripple from "react-native-material-ripple";
import Api from "../Api";
import axios from "axios";
import { useData } from "../Context/Contexter";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import RelativeTime from "./RelativeTime";

const Posts = ({ post, index, admin, updateLikeCount }) => {
  const { width, height } = Dimensions.get("window");
  let initialText = post.item?.PostText ? post.item?.PostText : post.PostText;
  const { user, setUser } = useData();
  const wordThreshold = 20;
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  // Function to count words in a string
  const countWords = (text) => {
    return text?.trim().split(/\s+/).length;
  };
  // delete disp state
  const [deldisplay, setDeldisplay] = useState(false);
  const handleDelDisp = () => {
    setDeldisplay((prev) => !prev);
  };
  // handle Delete
  const HandleDelete = async (postId) => {
    try {
      const res = await axios.post.item(`${Api}/Post/deletePost/${user._id}`, {
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
  const [likeCount, setLikeCount] = useState(
    post?.item?.Like ? post.item.Like : post?.Like
  );
  const handleLike = async () => {
    try {
      // Send request to the backend to increment the like count
      const res = await axios.post(
        `${Api}/Post/likePost/${post.item._id ? post.item._id : post._id}`
      );
      if (res.status === 200) {
        // Update the like count locally
        setLikeCount(likeCount + 1);
        updateLikeCount(
          post?.item?.Like ? post.item?.Like : post?.Like,
          likeCount + 1
        ); // Update the like count in parent component
      }
    } catch (error) {
      console.error("Error liking the post.item", error);
    }
  };
  return (
    <View
      key={index}
      style={{
        // borderWidth: 1,
        height: expanded ? "auto" : "auto",
        marginTop: 20,
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "white",
        marginBottom: 10,
        marginHorizontal: 5,
        position: "relative",
        // margin: 10,
      }}
    >
      {/* post.item header */}
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
              ? post.item?.firstName + post.item?.LastName
              : post.firstName + post.LastName}
          </Text>
          <Text
            style={{
              fontSize: width * 0.033,
              color: Colors.lightGrey,
              fontFamily: font.poppins,
            }}
          >
            {post.item?.Institute ? post.item?.Institute : post.Institute}
          </Text>
        </View>
        {admin && (
          <TouchableOpacity onPress={() => handleDelDisp()}>
            <Image
              source={{ uri: "https://i.ibb.co/nn25gZN/menu.png" }}
              style={{ width: 20, height: 20, tintColor: Colors.lightGrey }}
            />
          </TouchableOpacity>
        )}
        {/* delete section */}
        <TouchableOpacity
          onPress={() =>
            HandleDelete(post.item?._id ? post.item?._id : post._id)
          }
          style={{
            position: "absolute",
            right: width * 0.03,
            top: height * 0.07,
            backgroundColor: "orange",
            borderRadius: 4,
            display: deldisplay ? "flex" : "none",
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
      </View>
      {/* post.item about */}
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
          : `${initialText?.split(" ").slice(0, wordThreshold).join(" ")}...`}
      </Text>
      {countWords(initialText) > wordThreshold && (
        <TouchableOpacity onPress={toggleExpanded} style={styles.showMore}>
          <Text style={{ color: "#595959" }}>
            {expanded ? "Show less" : "Show more"}
          </Text>
        </TouchableOpacity>
      )}
      <Text style={{ color: Colors.violet }}>{post.item?.PostLink}</Text>
      {/* post.item image */}
      {post.item?.Images
        ? post.item?.Images
        : post.Images && (
            <FlatList
              data={post.item?.Images ? post.item?.Images : post.Images}
              style={{ borderWidth: 0 }}
              horizontal={true}
              renderItem={({ item, index }) => (
                <Image
                  key={index}
                  source={{ uri: item }}
                  style={{
                    width:
                      post.item?.Images.length == 1
                        ? width * 0.84
                        : width * 0.8,
                    height: height * 0.3,
                    objectFit: "contain",
                    borderWidth: 1,
                  }}
                />
              )}
            />
          )}
      {/* post.item sections */}
      <View
        style={{
          // borderWidth: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 5,
          paddingTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={handleLike}
          style={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}
        >
          <Text style={{ fontFamily: font.poppins, fontSize: width * 0.04 }}>
            {post.item?.Like ? post.item?.Like : post.Like}
          </Text>
          <FontAwesomeIcon size={20} icon={faHeart} color={Colors.mildGrey} />
          {/* <Image
            source={require("../assets/images/like.png")}
            style={{ width: 25, height: 25, tintColor: Colors.lightGrey }}
          /> */}
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: "row", columnGap: 10 }}>
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
          time={post.item?.Time ? post.item?.Time : post.Time}
          fsize={width * 0.033}
        />
      </View>
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({});
