import TopicsText from "@/utils/TopicsText";
import Api from "../Api";
import { useData } from "@/Context/Contexter";
import axios from "axios";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { View, Text, Button, Alert, Dimensions } from "react-native";
import { RadioButton } from "react-native-paper";
import PragraphText from "@/utils/PragraphText";
import { Colors } from "@/constants/Colors";

const AssignmentPlayGround = () => {
  const { assignmentType, user } = useData();
  const { width, height } = Dimensions.get("window");
  const [currentQuiz, setCurrentQuiz] = useState();
  const difficulty = ["easy", "medium", "hard"];
  const [difficultyInfo, setDifficultyInfo] = useState("easy");
  const HandleSetDifficulty = (level) => {
    setDifficultyInfo(level);
    getAssignment(assignmentType, level);
    checkExistsLevel();
  };
  //  check the exists level info
  const checkExistsLevel = useCallback(
    (level) => {
      const findAssignment = user?.Assignments?.find(
        (item) =>
          item.AssignmentType.toLowerCase() == assignmentType.toLowerCase()
      );
      console.log("asignment", findAssignment);
    },
    [user, difficultyInfo]
  );
  //
  const getAssignment = useCallback(
    async (ChallengeTopic, level) => {
      // console.log(level);
      try {
        const res = await axios.get(
          `${Api}/Assignment/getAssignments/${ChallengeTopic}`
        );
        if (res.data) {
          const { easy, medium, hard } = res.data;
          switch (level) {
            case "easy":
              // console.log(easy);
              setCurrentQuiz([...easy]);
              break;
            case "medium":
              setCurrentQuiz([...medium]);
              break;
            case "hard":
              setCurrentQuiz([...hard]);
              break;
          }
        }
      } catch (err) {
        setError("Failed to load challenges. Please try again.");
        console.error("Error fetching challenges:", err);
      }
    },
    [difficultyInfo]
  );
  useEffect(() => {
    getAssignment(assignmentType, "easy");
  }, []);
  //

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(currentQuiz?.length).fill(null)
  ); // Array to store selected answers

  // Handle option selection with useCallback
  const handleOptionSelect = useCallback(
    (option) => {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[currentQuestionIndex] = option; // Set the selected answer for the current question
      setSelectedAnswers(updatedAnswers);
    },
    [currentQuestionIndex, selectedAnswers]
  );

  // Check answers and evaluate score
  const checkAnswers = useCallback(async () => {
    let score = 0;
    currentQuiz?.forEach((item, index) => {
      if (item.answer === selectedAnswers[index]) {
        score += 1;
      }
    });

    // Alert based on score
    if (
      score > difficultyInfo.toLowerCase() == "easy"
        ? 8
        : difficultyInfo.toLowerCase() == "medium"
        ? 15
        : 15
    ) {
      const res = await axios.post(
        `${Api}/Assignment/saveAssignment/${user._id}`,
        { AssignmentType: assignmentType, point: score, level: difficultyInfo }
      );
      if (res.data.Email) {
        setUserId(res.data);
        Alert.alert("Congratulations!", "You passed the quiz!");
      }
    } else {
      Alert.alert("Try Again!", `You did not pass. Score: ${score}`);
    }
  }, [selectedAnswers]);

  // Move to the next question
  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuiz?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Move to the previous question
  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  // return <Text>fg</Text>;
  return (
    <View style={{ padding: 20, backgroundColor: "white", flex: 1 }}>
      <TopicsText text={assignmentType.toUpperCase()} mb={5} />
      <PragraphText text={"Choose Difficulty"} />
      {/* dificulty options */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {difficulty.map((item) => (
          <Text
            onPress={() => HandleSetDifficulty(item)}
            style={{
              paddingHorizontal: width * 0.06,
              borderWidth: 1,
              paddingVertical: 10,
              borderRadius: 5,
              letterSpacing: 1,
              fontSize: width * 0.025,
              borderColor: Colors.lightGrey,
            }}
          >
            {item.toUpperCase()}
          </Text>
        ))}
      </View>
      {/* dif */}
      <Text
        style={{
          marginVertical: 10,
          color:
            difficultyInfo.toLowerCase() == "easy"
              ? "green"
              : difficultyInfo.toLowerCase() == "medium"
              ? "orange"
              : "red",
        }}
      >
        {difficultyInfo.toUpperCase()}
      </Text>
      {currentQuiz && (
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontSize: width * 0.05,
              // fontWeight: "600",
              // color: Colors.mildGrey,
            }}
          >
            {currentQuiz[currentQuestionIndex].question_id}.{" "}
            {currentQuiz[currentQuestionIndex].question}
          </Text>

          <RadioButton.Group
            onValueChange={handleOptionSelect}
            value={selectedAnswers[currentQuestionIndex]}
          >
            {currentQuiz[currentQuestionIndex].options.map((option, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  // borderWidth: 0.2,
                  marginTop: 14,
                  padding: 10,
                  flexWrap: "wrap", // Allow text to wrap within the container
                  elevation: 2,
                  backgroundColor: "white",
                  borderRadius: 5,
                }}
              >
                <RadioButton value={option} />
                <Text
                  style={{
                    color: Colors.mildGrey,
                    flexShrink: 1, // Prevent text from overflowing the container
                    // marginLeft: 10, // Add some space between the radio button and text
                  }}
                >
                  {option}
                </Text>
              </View>
            ))}
          </RadioButton.Group>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Button
              title="Previous"
              onPress={previousQuestion}
              disabled={currentQuestionIndex === 0}
            />
            {currentQuestionIndex === currentQuiz?.length - 1 ? (
              <Button title="Submit Quiz" onPress={checkAnswers} />
            ) : (
              <Button title="Next" onPress={nextQuestion} />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default AssignmentPlayGround;
