// ClassificationForm.js
import React, { useState } from "react";
import {
  Button,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { questions } from "./Questions";
import doodle from "../Images/levelDoodle.jpg"; // Adjust path if necessary
import { useNavigate } from "react-router-dom";

export default function ClassificationForm() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1); // Increment score for the correct answer
    }
    setSelectedAnswer(null); // Reset selected answer for the next question
    setCurrentQuestion(currentQuestion + 1); // Move to the next question
  };

  const handleFinish = ()=>{
    const level = score <= 5 ? "Beginner" : score <= 10 ? "Intermediate" : "Advanced";
    const goal = "Computer Engineering Placement Preparation";
    navigate('/form', {state:{level,goal} });
  }
  if (currentQuestion >= questions.length) {
    // Display the result after all questions
    return (
      <div style={styles.container}>
        <div style={styles.questions}>
          <Typography variant="h4">Your Score: {score}</Typography>
          <Typography variant="h6">
            {score <= 5
              ? "Beginner"
              : score <= 10
              ? "Intermediate"
              : "Advanced"}
          </Typography>
          <Button
            variant="contained"
            onClick={handleFinish}
            style={styles.btn}
          >
            Next
          </Button>
        </div>
        <img src={doodle} alt="Doodle" style={styles.doodleImage} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.questions}>
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            sx={{
              marginTop: "5%",
              color: "#6A9C89",
              fontWeight: "bold",
              "&.Mui-focused": { color: "#006D5B" },
            }}
          >
            {questions[currentQuestion].questionText}
          </FormLabel>
          <RadioGroup
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            sx={{ marginLeft: "10%" }}
          >
            {questions[currentQuestion].options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.id}
                control={
                  <Radio
                    sx={{
                      color: "black", // Default color
                      "&.Mui-checked": {
                        color: "#006D5B", // Selected color
                      },
                    }}
                  />
                }
                label={option.answerText}
              />
            ))}
          </RadioGroup>
          <Button
            variant="contained"
            onClick={handleNextQuestion}
            style={styles.btn}
          >
            Next
          </Button>
        </FormControl>
      </div>
      <img src={doodle} alt="Doodle" style={styles.doodleImage} />
    </div>
  );
}

const styles = {
  btn: {
    width: "40%",
    backgroundColor: "#6A9C89",
    color: "white",
    margin: "5%",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
  },
  questions: {
    flex: 1,
    textAlign: "center",
  },
  doodleImage: {
    width: "40%",
    height: "auto",
  },
};
