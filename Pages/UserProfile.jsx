import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useData } from "../Context/Contexter";
import HeadingText from "../utils/HeadingText";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ripple from "react-native-material-ripple";
import { Colors } from "../constants/Colors";
import Posts from "../components/Posts";
import HrLine from "../utils/HrLine";
import axios from "axios";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Api from "../Api";

const UserProfile = () => {
  const { width, height } = Dimensions.get("window");
  const { selectedUser, user } = useData();
  // ckech if this user follwer
  const [existsFollower, setExistsfollower] = useState(false);
  const findExistsFollower = async () => {
    const res = await axios.post(`${Api}/Following/findExistsConnection`, {
      ConnectionId: selectedUser?._id,
      userId: user._id,
    });
    if (res.data) {
      setExistsfollower(true);
      console.log(res.data);
    } else {
      setExistsfollower(false);
    }
  };
  useEffect(() => {
    findExistsFollower();
  }, [selectedUser]);
  // add folower
  const addFollower = async () => {
    const res = await axios.post(`${Api}/Following/addConnection`, {
      ConnectionId: selectedUser?._id,
      userId: user._id,
    });
    if (res.data) {
      setExistsfollower(true);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
      //   refreshControl={
      //     <RefreshControl refreshing={refControl} onRefresh={refreshUser} />
      //   }
    >
      {/* Header */}
      <View style={{ paddingHorizontal: width * 0.05 }}>
        <HeadingText text="Profile" />
      </View>

      {/* About Section */}
      <View style={{ borderWidth: 0 }}>
        <Image
          source={{
            uri: selectedUser?.Images?.coverImg,
          }}
          style={{ width: "100%", height: 220, resizeMode: "cover" }}
        />
        <View
          style={{
            top: -50,
            width: "100%",
            flexDirection: "column",
            rowGap: 5,
            justifyContent: "flex-start",
            paddingHorizontal: width * 0.05,
          }}
        >
          <Image
            source={{
              uri: selectedUser?.Images?.profile
                ? selectedUser?.Images?.profile
                : selectedUser?.Gender === "Male"
                ? "https://i.ibb.co/3T4mNMm/man.png"
                : "https://i.ibb.co/3mCcQp9/woman.png",
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderColor: "white",
              borderWidth: 5,
              resizeMode: "cover",
            }}
          />

          {/* User Name and Bio */}
          <Text
            style={{
              color: Colors.veryDarkGrey,
              fontSize: width * 0.06,
              letterSpacing: 1,
            }}
          >
            {selectedUser?.firstName} {selectedUser?.LastName}
          </Text>
          <Text
            style={{
              color: Colors.mildGrey,
              fontSize: width * 0.04,
              letterSpacing: 1,
            }}
          >
            {selectedUser?.Bio ? selectedUser.Bio : "I want to become a Winner"}
          </Text>
          {/* Update User Info Modal */}

          {/* Institute Name and Location */}
          <View style={{ height: 5 }} />
          <Text
            style={{
              color: Colors.veryDarkGrey,
              fontSize: width * 0.04,
              letterSpacing: 1,
            }}
          >
            {selectedUser?.InstitudeName}
          </Text>
          <Text
            style={{
              color: Colors.mildGrey,
              fontSize: width * 0.04,
              letterSpacing: 1,
            }}
          >
            {selectedUser?.District}, {selectedUser?.State}
          </Text>
        </View>
      </View>

      {/* Following Info */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: height * -0.02,
          marginBottom: 5,
          flexWrap: "wrap",
        }}
      >
        <View>
          {existsFollower ? (
            <Ripple
              style={{
                backgroundColor: Colors.violet,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: width * 0.03,
                borderRadius: 5,
                columnGap: 10,
              }}
            >
              <SimpleLineIcons name="user-following" size={20} color="white" />
              <Text
                style={{
                  fontSize: width * 0.04,
                  color: "white",
                  letterSpacing: 1,
                }}
              >
                Follow
              </Text>
            </Ripple>
          ) : (
            <Ripple
              onPress={addFollower}
              style={{
                backgroundColor: Colors.mildGrey,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: width * 0.03,
                borderRadius: 5,
                columnGap: 10,
              }}
            >
              <SimpleLineIcons name="user-follow" size={20} color="white" />
              <Text
                style={{
                  fontSize: width * 0.04,
                  color: "white",
                  letterSpacing: 1,
                }}
              >
                Follow
              </Text>
            </Ripple>
          )}
        </View>
        <View>
          <Text
            style={{
              fontWeight: "600",
              color: Colors.mildGrey,
              letterSpacing: 1,
            }}
          >
            NetWorks
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: Colors.mildGrey,
              fontSize: width * 0.04,
              letterSpacing: 1,
            }}
          >
            {selectedUser?.Connections?.length}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontWeight: "600",
              color: Colors.mildGrey,
              letterSpacing: 1,
            }}
          >
            Posts
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: Colors.mildGrey,
              fontSize: width * 0.04,
              letterSpacing: 1,
            }}
          >
            {selectedUser?.Posts?.length}
          </Text>
        </View>
      </View>
      {/* post */}
      {/* H */}
      <HrLine />
      <Text
        style={{
          color: Colors.mildGrey,
          fontSize: width * 0.06,
          letterSpacing: 1,
          paddingHorizontal: 20,
        }}
      >
        Posts
      </Text>
      <View>
        {selectedUser?.Posts.map((post, index) => (
          <Posts post={post} index={index} />
        ))}
      </View>
    </ScrollView>
  );
};

export default UserProfile;
