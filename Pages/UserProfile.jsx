import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useData } from "../Context/Contexter";
import HeadingText from "../utils/HeadingText";
import { Colors } from "react-native/Libraries/NewAppScreen";

const UserProfile = () => {
  const { width, height } = Dimensions.get("window");
  const { selectedUser } = useData();

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
                : selectedUser.Gender === "Male"
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
            {selectedUser?.firstName} {selectedUser.LastName}
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
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: "600",
              color: Colors.mildGrey,
              letterSpacing: 1,
            }}
          >
            Followers
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: Colors.mildGrey,
              fontSize: width * 0.04,
              letterSpacing: 1,
            }}
          >
            {selectedUser?.Followers?.length}
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
            Following
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: Colors.mildGrey,
              fontSize: width * 0.04,
              letterSpacing: 1,
            }}
          >
            {selectedUser?.Following?.length}
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
    </ScrollView>
  );
};

export default UserProfile;
