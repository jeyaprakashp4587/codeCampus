import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { Colors, font, pageView } from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Button } from "react-native-paper";
import Api from "../Api";
import axios from "axios";
import { TextInput } from "react-native-paper";
import { Alert } from "react-native";
import { useData } from "../Context/Contexter";
import { ScrollView } from "react-native";
import Ripple from "react-native-material-ripple";
const { width, height } = Dimensions.get("window");

const Login = ({ navigation }) => {
  const { setUser } = useData();
  const navigation = useNavigation();

  const [form, setForm] = useState({
    Email: "",
    Password: "",
  });

  const [activityIndi, setActivityIndi] = useState(false);

  // Email and password handlers with memoization to prevent unnecessary re-renders
  const handleEmail = useCallback((name, text) => {
    setForm((prevForm) => ({ ...prevForm, [name]: text }));
  }, []);

  const handlePassword = useCallback((name, text) => {
    setForm((prevForm) => ({ ...prevForm, [name]: text }));
  }, []);

  // Email validation function
  const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

  // Full form validation function
  const validateForm = useCallback(() => {
    if (!isEmailValid(form.Email)) {
      Alert.alert("Invalid email format.");
      return false;
    }

    for (let key in form) {
      if (!form[key]) {
        Alert.alert(`${key} is required.`);
        return false;
      }
    }

    return true;
  }, [form]);

  // Handle login
  const HandleLogin = useCallback(async () => {
    setActivityIndi(true);

    if (!validateForm()) {
      setActivityIndi(false);
      return;
    }

    try {
      const { data } = await axios.post(`${Api}/LogIn/signIn`, form);

      if (data?.firstName) {
        await AsyncStorage.setItem("Email", data.Email);
        setUser(data);
        navigation.navigate("Tab");
      } else {
        Alert.alert("Email or Password is incorrect.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login failed, please try again.");
    } finally {
      setActivityIndi(false);
    }
  }, [form, validateForm, setUser, navigation]);
  // send the user data to server

  return (
    <ScrollView style={styles.pageView}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://i.ibb.co/P5s1nZ5/loginbg.png" }}
            style={styles.image}
          />
          <Text style={styles.welcomeText}>
            Welcome To Code Campus, Growth Your Career From Here
          </Text>
        </View>
        {/* login inputs wrapper */}
        <View style={styles.inputsWrapper}>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            textColor={styles.textColor}
            activeOutlineColor={styles.activeOutlineColor}
            outlineColor={styles.outlineColor}
            outlineStyle={styles.outlineStyle}
            label="Email"
            onChangeText={(text) => handleEmail("Email", text)}
          />
          <TextInput
            style={styles.textInput}
            mode="outlined"
            textColor={styles.textColor}
            outlineStyle={styles.outlineStyle}
            activeOutlineColor={styles.activeOutlineColor}
            outlineColor={styles.outlineColor}
            label="Password"
            onChangeText={(text) => handlePassword("Password", text)}
          />
          <Ripple
            onPress={HandleLogin}
            style={{
              backgroundColor: Colors.veryLightGrey,
              padding: 15,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              flexDirection: "row",
              columnGap: 5,
            }}
          >
            {activityIndi && (
              <ActivityIndicator size={20} color={Colors.violet} />
            )}
            <Text
              style={{
                fontWeight: "700",
                letterSpacing: 1,
                fontSize: width * 0.03,
              }}
            >
              Log In
            </Text>
          </Ripple>
          {/* <Button
            bgcolor={styles.buttonColor}
            text="Log in"
            function={() => HandleLogin()}
            width="100%"
          /> */}
        </View>
        {/* indicate */}
        <View style={styles.indicator}>
          <Text style={styles.indicatorText}>OR</Text>
        </View>
        {/* login options */}

        <View style={styles.loginOptions}>
          <TouchableOpacity>
            <Image
              source={{ uri: "https://i.ibb.co/zQC87X0/search.png" }}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={{ uri: "https://i.ibb.co/Ypbh3dM/facebook.png" }}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={{ uri: "https://i.ibb.co/xDZP0Lx/github.png" }}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't Have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text style={styles.signUpLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    paddingHorizontal: "8%",
    flexDirection: "column",
    justifyContent: "space-around",
    overflow: "scroll",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: width * 0.75,
    height: width * 0.75,
    alignSelf: "center",
  },
  welcomeText: {
    textAlign: "center",
    fontSize: width * 0.045,
    lineHeight: height * 0.04,
    color: Colors.veryDarkGrey, // Adjust to your Colors.veryDarkGrey
  },
  inputsWrapper: {
    flexDirection: "column",
    rowGap: 10,
    marginVertical: 20,
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: Colors.veryLightGrey,
  },
  textColor: Colors.mildGrey, // Adjust to your Colors.mildGrey
  activeOutlineColor: Colors.mildGrey, // Adjust to your Colors.mildGrey
  outlineColor: Colors.mildGrey, // Adjust to your Colors.mildGrey
  outlineStyle: { borderWidth: 1 },
  buttonColor: Colors.veryLightGrey, // Adjust to your Colors.veryLightGrey
  indicator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.veryLightGrey, // Adjust to your Colors.veryLightGrey
    marginVertical: 20,
    position: "relative",
  },
  indicatorText: {
    position: "absolute",
    color: Colors.lightGrey, // Adjust to your Colors.lightGrey
    backgroundColor: "white",
    top: -10,
    textAlign: "center",
    alignSelf: "center",
  },
  loginOptions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
  signUpContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 20,
  },
  signUpLink: {
    color: "orange",
    textDecorationLine: "underline",
    paddingHorizontal: 10,
  },
});

export default Login;
