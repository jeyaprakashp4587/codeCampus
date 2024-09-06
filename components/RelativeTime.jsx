import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import moment from "moment";

const RelativeTime = ({ time }) => {
  const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    const updateRelativeTime = () => {
      setRelativeTime(moment(time).fromNow());
    };

    updateRelativeTime();

    const intervalId = setInterval(updateRelativeTime, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  return { relativeTime };
};

export default RelativeTime;
