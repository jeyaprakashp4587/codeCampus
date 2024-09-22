import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal, // Import Modal for showing liked users
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
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const Posts = ({ post, index, admin, senderDetails }) => {
  const { width, height } = Dimensions.get("window");
  const initialText = post?.PostText;
  const { user, setUser } = useData();
  const wordThreshold = 20;
  const [expanded, setExpanded] = useState(false);
  const [deldisplay, setDeldisplay] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.Like);
  const navigation = useNavigation();
  const { setSelectedUser } = useData();
  const [liked, setLiked] = useState(
    post?.LikedUsers?.some((likeuser) => likeuser?.LikedUser === user?._id)
  );

  const [likedUsers, setLikedUsers] = useState([]); // Store liked users data
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state

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
        LikedTime: moment().format("YYYY-MM-DDTHH:mm:ss"),
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

  // Fetch liked users and show the modal
  const handleShowLikedUsers = async () => {
    try {
      const res = await axios.get(`${Api}/Post/getLikedUsers/${post._id}`);
      if (res.status === 200) {
        setLikedUsers(res.data.likedUsers);
        // console.log(res.data);
        // Assume likedUsers contains first name, last name, and profile picture
        setIsModalVisible(true); // Open the modal
      }
    } catch (err) {
      console.error("Failed to fetch liked users:", err);
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
          // style={{ borderWidth: 1 }}
          renderItem={({ item, index }) => (
            <Image
              key={index}
              source={{ uri: item }}
              style={{
                width: post.Images.length === 1 ? width * 0.84 : width * 0.8,
                height: height * 0.3,
                resizeMode: "contain",
              }}
            />
          )}
        />
      )}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          // borderWidth: 1,
          // flex: 1,
          marginTop: 5,
        }}
      >
        <TouchableOpacity
          onPress={handleLikeToggle}
          style={{ flexDirection: "row", alignItems: "center", columnGap: 5 }}
        >
          <Text style={{ fontFamily: font.poppins, fontSize: width * 0.048 }}>
            {likeCount}
          </Text>
          <FontAwesomeIcon
            size={18}
            icon={faHeart}
            color={liked ? "red" : Colors.mildGrey}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", columnGap: 5 }}
        >
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
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => handleShowLikedUsers(post?._id)} // Show the list of liked users
      >
        <Text style={{ fontFamily: font.poppins, fontSize: width * 0.03 }}>
          See who liked
        </Text>
      </TouchableOpacity>

      {/* Modal to show liked users */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View
          style={{
            width: "100%",
            height: "60%",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            borderWidth: 1,
            borderColor: Colors.lightGrey,
          }}
        >
          {likedUsers.length > 0 ? (
            <View>
              <Text
                style={{
                  color: Colors.mildGrey,
                  letterSpacing: 2,
                  paddingVertical: 10,
                }}
              >
                Likes
              </Text>
              <FlatList
                data={likedUsers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      // borderWidth: 1,
                      width: width * 0.9,
                      marginTop: 8,
                      columnGap: 10,
                      paddingVertical: 10,
                      borderBottomWidth: 1,
                      borderColor: Colors.veryLightGrey,
                    }}
                    onPress={() => {
                      navigation.navigate("userprofile");
                      setSelectedUser(item.userId);
                    }}
                  >
                    <Image
                      source={{ uri: item.profile }}
                      style={{
                        width: width * 0.13,
                        height: height * 0.07,
                        borderRadius: 50,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: width * 0.04,
                        letterSpacing: 1,
                        flex: 1,
                      }}
                    >
                      {item.firstName}
                      {"  "}
                      {item.LastName}
                    </Text>
                    <RelativeTime time={item.LikedTime} fsize={width * 0.033} />
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : (
            <Text>No Likes</Text>
          )}
        </View>
      </Modal>
    </View>
  );
};

// Add necessary styles including modal styling
const styles = StyleSheet.create({});

export default Posts;
