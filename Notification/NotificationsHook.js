import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useEffect, useRef, useState } from "react";
import { Alert, Platform } from "react-native";

const useNotificationsHook = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Register for push notifications and get the token
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
        // Send the token to the server if needed
        // console.log("Push Token: ", token);
      }
    });

    // Handle notifications when the app is in the foreground
    // Notifications.setNotificationHandler({
    //   handleNotification: async () => ({
    //     shouldShowAlert: true,
    //     shouldPlaySound: true,
    //     shouldSetBadge: true,
    //   }),
    // });

    // Listen to incoming notifications
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // console.log("Notification received:", notification);
      });

    // Listen to notification responses (when a user interacts with a notification)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log("Notification response received:", response);
      });

    // Clean up listeners when the component unmounts
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  // Register device for push notifications and request permission
  async function registerForPushNotificationsAsync() {
    let token;
    try {
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
        // console.log("Expo Push Token: ", token);
      } else {
        Alert.alert("Must use physical device for push notifications.");
      }

      // Configure Android notification settings
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 500, 250, 500],
          lightColor: "#FF231F7C",
          sound: true,
        });
      }
    } catch (error) {
      // console.error("Error registering for push notifications:", error);
    }
    return token;
  }

  // Function to send a local notification
  async function sendLocalNotification(msgData) {
    // console.log("Scheduling notification:", msgData.text);
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "New Message!",
          body: msgData.text,
          data: { msgData },
        },
        trigger: {
          seconds: 2, // Notification will trigger after 2 seconds
        },
      });
      console.log("Notification scheduled with ID:", notificationId);
    } catch (error) {
      // console.error("Error scheduling notification:", error);
    }
  }

  return { sendLocalNotification, expoPushToken };
};

export default useNotificationsHook;
