import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useEffect, useRef, useState } from "react";
import { Alert, Platform } from "react-native";

const NotificationsHook = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Register for push notifications and get the token
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
        // You might want to send the token to your server here
      }
    });

    // Listen to incoming notifications
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // Handle notification received
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // Handle notification response
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    try {
      let token;
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          Alert.alert("Failed to get push token for push notification!");
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("Expo push token:", token);
      } else {
        Alert.alert("Must use physical device for Push Notifications");
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 500, 250, 500],
          lightColor: "#FF231F7C",
        });
      }

      return token;
    } catch (error) {
      console.error("Error getting push token:", error);
    }
  }

  // Function to send a local notification
  async function sendLocalNotification(msgData) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "New Message!",
        body: msgData.text,
        data: { msgData },
      },
      trigger: null,
    });
  }

  return { sendLocalNotification };
};

export default NotificationsHook;
