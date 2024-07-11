import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { pageView } from "../constants/Colors";
import { useData } from "../Context/Contexter";
import HeadingText from "../utils/HeadingText";
import TopicsText from "../utils/TopicsText";
import Button from "../utils/Button";

const ChallengeDetail = () => {
  const { selectedChallenge } = useData();
  //   console.log(selectedChallenge);
  return (
    <View style={pageView}>
      <HeadingText text="Challenge Details" />
      <View>
        <TopicsText text={selectedChallenge?.title} fszie={20} />
        <View style={{ flexDirection: "row", columnGap: 17 }}>
          {selectedChallenge?.technologies.map((item) =>
            React.cloneElement(item.icon, { size: 25 })
          )}
        </View>
        <View>
          {selectedChallenge?.rules.map((rule) => (
            <Text>*{rule}</Text>
          ))}
        </View>
        <Button
          text="Start Challenge"
          bgcolor="#6699ff"
          textColor="white"
          fsize={18}
        />
      </View>
    </View>
  );
};

export default ChallengeDetail;

const styles = StyleSheet.create({});
