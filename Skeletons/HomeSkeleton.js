import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Colors, pageView } from "../constants/Colors";
import Skeleton from "../Skeletons/Skeleton";

const HomeSkeleton = () => {
  return (
    <View style={pageView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Skeleton width={60} height={60} radius={40} />
          <Skeleton width={250} height={60} radius={10} />
          <Skeleton width={50} height={60} radius={10} />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 20,
            justifyContent: "space-between",
          }}
        >
          <Skeleton width={120} height={60} radius={10} />
          <Skeleton width={120} height={60} radius={10} />
          <Skeleton width={120} height={60} radius={10} />
        </View>
        <View style={{ flexDirection: "column", rowGap: 20, marginBottom: 20 }}>
          <Skeleton width="100%" height={260} radius={10} />
          <Skeleton width="100%" height={260} radius={10} />
          <Skeleton width="100%" height={260} radius={10} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeSkeleton;

const styles = StyleSheet.create({});
