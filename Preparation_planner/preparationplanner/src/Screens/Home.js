import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Grid, Chip } from "@mui/material";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    //console.log("Stored user:", storedUser); // Check if it has the expected structure
    if (storedUser?._id) {
      fetch(`http://localhost:5001/user/${storedUser._id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched user data from backend:", data);
          setUserData(data);
        }) 
        .catch((error) => console.error("Error fetching user data:", error));
    }

    fetch("http://localhost:5001/dataset")
      .then((res) => res.json())
      .then((data) => setDataset(data))
      .catch((error) => console.error("Error fetching dataset:", error));
  }, []);

  const isGoalCompleted = (goal) => {
    if (!userData || !dataset || !dataset[goal]) return false;

    const userProgress = userData.progress?.[goal] || {};
    const completedSubtopics = Object.values(userProgress).flat();

    const allLevels = ["beginner", "intermediate", "advanced"];
    const levelOrder = {
      beginner: 0,
      intermediate: 1,
      advanced: 2,
    };

    const startingLevel = userData.starting_levels?.[goal] || "beginner";
    const levels = allLevels.slice(0, levelOrder[startingLevel] + 1); // 👈 only check up to enrolled level

    console.log("Goal:", goal);
    console.log("Starting Level:", startingLevel);
    console.log("Levels to check:", levels);
    console.log("Completed subtopics:", completedSubtopics);  

    for (const level of levels) {
      const levelData = dataset[goal][level] || [];
      for (const topic of levelData) {
        for (const sub of topic.subtopics) {
          if (!completedSubtopics.includes(sub.name)) {
            console.log("Missing subtopic:", sub.name);
            return false; // still something left
          }
        }
      }
    }

    return true; // all subtopics completed
  };

  if (!userData || !dataset)
    return (
      <Typography variant="h6" align="center">
        Loading your plan...
      </Typography>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 5,
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Welcome Back!
      </Typography>

      <Card
        sx={{
          width: "90%",
          maxWidth: "500px",
          mb: 4,
          borderRadius: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            Current Study Day
          </Typography>
          <Typography variant="h3" fontWeight="bold" color="#FFB400">
            {userData.day}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h5" mb={2}>
        🎯 Your Goals
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ width: "90%", maxWidth: "900px" }}
      >
        {userData.goals && userData.goals.length > 0 ? (
          userData.goals.map((goal, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  backgroundColor: "#ffffff",
                }}
              >
                <CardContent>
                  <Typography variant="h6" mb={1}>
                    {goal}
                  </Typography>
                  <Chip
                    label={
                      isGoalCompleted(goal)
                        ? "Completed ✅"
                        : "Not Completed ❌"
                    }
                    color={isGoalCompleted(goal) ? "success" : "warning"}
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No goals enrolled yet.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Home;
