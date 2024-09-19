import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useCallback } from "react";
import { TextInput } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Ripple from "react-native-material-ripple";
import Api from "../Api";
import { Colors, font, pageView } from "../constants/Colors";

const SignUp = ({ navigation }) => {
  // References to each input
  const refs = useRef({
    First_Name: React.createRef(),
    Last_Name: React.createRef(),
    Email: React.createRef(),
    Password: React.createRef(),
    Confirm_Password: React.createRef(),
    Gender: React.createRef(),
    Date_Of_Birth: React.createRef(),
    Degree_name: React.createRef(),
    Institute_Name: React.createRef(),
    State: React.createRef(),
    District: React.createRef(),
    Nationality: React.createRef(),
  }).current;

  const [formData, setFormData] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    Password: "",
    Confirm_Password: "",
    Gender: "",
    Date_Of_Birth: "",
    Degree_name: "",
    Institute_Name: "",
    State: "",
    District: "",
    Nationality: "",
  });

  const [loading, setLoading] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);

  // Handle input updates
  const handleInput = useCallback((name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Validate form before submitting
  const validateForm = () => {
    let isValid = true;
    const { Password, Confirm_Password, Email } = formData;

    // Validate each field
    for (let key in formData) {
      if (!formData[key]) {
        refs[key].current.setNativeProps({
          style: { borderColor: "red", borderWidth: 1, borderRadius: 5 },
        });
        setLoading(false);
        isValid = false;
      } else {
        refs[key].current.setNativeProps({
          style: { borderColor: Colors.veryLightGrey, borderWidth: 0 },
        });
      }
    }

    // Additional validation for password match
    if (Password !== Confirm_Password) {
      refs.Confirm_Password.current.setNativeProps({
        style: { borderColor: "red", borderWidth: 1 },
      });
      Alert.alert("Passwords do not match!");
      isValid = false;
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(Email)) {
      refs.Email.current.setNativeProps({
        style: { borderColor: "red", borderWidth: 1 },
      });
      isValid = false;
    }

    return isValid;
  };

  // Handle sign-up
  const handleSignUp = async () => {
    setLoading(true);
    if (validateForm()) {
      try {
        const response = await axios.post(`${Api}/LogIn/signUp`, formData);
        setLoading(false);

        if (response.data === "SignUp Successfully") {
          Alert.alert("Signup Successfully");
          navigation.navigate("login");
        } else if (response.data === "Email has Already Taken") {
          Alert.alert("Email has already been taken");
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        Alert.alert("Signup failed. Try again.");
      }
    } else {
      setLoading(false);
    }
  };

  // Handle gender selection
  const handleGenderSelect = (gender) => {
    handleInput("Gender", gender);
    setShowGenderModal(false);
  };

  return (
    <View style={[pageView, { paddingHorizontal: 20, paddingBottom: 20 }]}>
      <Text style={styles.headerText}>Sign Up</Text>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://i.ibb.co/Njft952/signbg.jpg" }}
            style={styles.image}
          />
          <Text style={styles.subText}>
            {"<"} Skills Will Speak Louder Than Papers /{">"}
          </Text>
        </View>

        {/* Text Inputs */}
        <View style={{ flexDirection: "column", rowGap: 5 }}>
          {Object.keys(formData).map((key) => (
            <TextInput
              style={styles.input}
              key={key}
              mode="outlined"
              textColor={Colors.mildGrey}
              activeOutlineColor={Colors.mildGrey}
              outlineColor={Colors.mildGrey}
              label={key.replace("_", " ")}
              ref={refs[key]}
              onFocus={() => key === "Gender" && setShowGenderModal(true)} // Open modal for gender
              onChangeText={(text) => handleInput(key, text)}
              value={formData[key]}
            />
          ))}
        </View>

        <View style={{ height: 20 }} />

        {/* Sign Up Button */}
        <Ripple onPress={handleSignUp} style={styles.signUpButton}>
          {loading && <ActivityIndicator size={22} color={Colors.mildGrey} />}
          <Text style={styles.signUpText}>Sign Up</Text>
        </Ripple>
      </ScrollView>

      <FontAwesomeIcon
        icon={faCode}
        size={500}
        color="hsl(0, 0%, 97%)"
        style={styles.backgroundIcon}
      />

      {/* Gender Selection Modal */}
      <Modal visible={showGenderModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select Gender</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleGenderSelect("Male")}
            >
              <Text style={styles.modalButtonText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleGenderSelect("Female")}
            >
              <Text style={styles.modalButtonText}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowGenderModal(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  headerText: {
    textAlign: "center",
    fontSize: 35,
    color: "hsl(0, 0%, 50%)",
    paddingBottom: 10,
  },
  imageContainer: {
    paddingBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: "center",
  },
  subText: {
    textAlign: "center",
    color: Colors.lightGrey,
  },
  input: {
    marginTop: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  signUpButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 5,
    backgroundColor: "orange",
    elevation: 2,
    width: "100%",
    alignSelf: "center",
  },
  signUpText: {
    fontSize: 15,
    color: "black",
    fontWeight: "400",
    letterSpacing: 1,
  },
  backgroundIcon: {
    position: "absolute",
    zIndex: -10,
    top: 370,
    alignSelf: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "orange",
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    color: "white",
  },
});
