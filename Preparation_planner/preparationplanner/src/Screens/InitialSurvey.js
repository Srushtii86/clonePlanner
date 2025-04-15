import React, { useState, useEffect } from "react";
//import axios from "axios";
import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import bgImage from "../Images/image.png";

const InitialSurvey = ({ user, setUser, setIsSurveyCompleted, onComplete }) => {
  console.log("setUser prop:", setUser);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // level: "",
    study_hours: "",
    goals: "",
    days_left: "",
    priorities: {},
    goalLevels: {},
  });

  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser?.firstLogin) {
      setIsSurveyCompleted(true);
      if (typeof onComplete === "function") {
        onComplete();
      }
      navigate("/home");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?._id;

      // Flask register call
      const flaskResponse = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          study_hours: parseInt(formData.study_hours),
          days_left: parseInt(formData.days_left),
          goals: formData.goals.split(",").map((g) => g.trim()),
          goals_with_priority: formData.priorities,
          user_levels: formData.goalLevels,
        }),
      });

      const flaskData = await flaskResponse.json();
      console.log("Flask register response:", flaskData);

      if (!flaskResponse.ok) {
        console.error("Flask register failed:", flaskData.error);
        return;
      }

      // Node update call
      const nodeResponse = await fetch(
        "http://localhost:5000/api/user/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            studyHours: parseInt(formData.study_hours),
            goals: formData.goals.split(",").map((g) => g.trim()),
          }),
        }
      );

      const nodeData = await nodeResponse.json();
      console.log("Node update response:", nodeData);

      if (nodeResponse.ok) {
        // ✅ Update local user data and state
        const updatedUser = { ...storedUser, firstLogin: false };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsSurveyCompleted(true);
        onComplete(); // optional callback
        navigate("/home");
      } else {
        console.error("Node update failed:", nodeData.message);
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
    }
  };
  
  if (!showForm) {
    return (
      <Typography variant="h4" align="center">
        Welcome to Home Page!
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: { xs: "90%", md: "400px" },
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2} align="center">
          Complete Your Profile
        </Typography>
        <form>
          <TextField
            fullWidth
            type="number"
            label="Study Hours per Day"
            name="study_hours"
            value={formData.study_hours}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="number"
            label="Days Left for Preparation"
            name="days_left"
            value={formData.days_left}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Goals (comma-separated)"
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          {formData.goals &&
            formData.goals.split(",").map((goalRaw, index) => {
              const goal = goalRaw.trim().toLowerCase();
              return (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mt: 1 }}>
                    {goal}
                  </Typography>
                  <TextField
                    type="number"
                    label={`Priority for ${goal}`}
                    value={formData.priorities[goal] || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        priorities: {
                          ...prev.priorities,
                          [goal]: e.target.value,
                        },
                      }))
                    }
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    select
                    label={`Level for ${goal}`}
                    value={formData.goalLevels[goal] || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        goalLevels: {
                          ...prev.goalLevels,
                          [goal]: e.target.value,
                        },
                      }))
                    }
                    fullWidth
                  >
                    <MenuItem value="beginner">Beginner</MenuItem>
                    <MenuItem value="intermediate">Intermediate</MenuItem>
                    <MenuItem value="advanced">Advanced</MenuItem>
                  </TextField>
                </Box>
              );
            })}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit} // ✅ Directly call handleSubmit
            sx={{
              backgroundColor: "#FFB400",
              color: "#fff",
              fontWeight: "bold",
              marginTop: 2,
              "&:hover": { backgroundColor: "#E69C00" },
            }}
          >
            Save and Continue
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default InitialSurvey;
