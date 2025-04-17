import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
  Checkbox,
  Button,
} from "@mui/material";

const CalendarPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleSelect = (index) => {
    setSelectedTasks((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser._id) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5001/tasks/${storedUser._id}`) // Flask endpoint
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched tasks:", data);

        // ✅ Filter out duplicates based on goal + topic + subtopic
        const seen = new Set();
        const uniqueTasks = data.filter((task) => {
          const key = `${task.goal}-${task.topic}-${task.subtopic}`;
          if (seen.has(key)) {
            return false;
          }
          seen.add(key);
          return true;
        });

        setTasks(uniqueTasks);
        setLoading(false);
      })

      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setLoading(false);
      });
  }, []);

  const handleGenerateNextPlan = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?._id;

    if (!userId) return alert("User not found");

    try {
      const response = await fetch(
        "http://localhost:5001/generate_next_day_plan",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            completed_indices: selectedTasks,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("🎯 Plan generated for tomorrow!");
        console.log("Next day plan:", data.day_plan);
        setSelectedTasks([]); // clear checked after success
        fetch(`http://localhost:5001/tasks/${userId}`)
          .then((res) => res.json())
          .then((newData) => {
            setTasks(newData);
          });
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Failed to generate plan:", error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
      <Typography variant="h4" fontWeight="bold" mb={4}>
        🗓️ Tasks For Today
      </Typography>

      {tasks.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No tasks for today! 🎉
        </Typography>
      ) : (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ width: "90%", maxWidth: "1200px" }}
        >
          {tasks.map((task, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  backgroundColor: selectedTasks.includes(index)
                    ? "rgba(0, 123, 255, 0.2)"
                    : "#ffffff",
                  transition: "background-color 0.3s ease", // Smooth transition
                }}
              >
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6" gutterBottom>
                      {task.goal}
                    </Typography>
                    <Checkbox
                      checked={selectedTasks.includes(index)}
                      onChange={() => handleSelect(index)}
                      color="primary"
                    />
                  </Box>

                  <Typography variant="subtitle1" color="text.secondary">
                    Topic: {task.topic}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Subtopic: {task.subtopic}
                  </Typography>
                  <Chip
                    label={`⏳ ${task.estimated_hours} hrs`}
                    sx={{ mt: 1 }}
                  />

                  <Box mt={2}>
                    <a
                      href={task.documentation}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Chip
                        label="📄 Documentation"
                        clickable
                        color="primary"
                        sx={{ mr: 1 }}
                      />
                    </a>
                    <a
                      href={task.questions}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Chip label="🧠 Practice" clickable color="secondary" />
                    </a>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={handleGenerateNextPlan}
      >
        🚀 Generate Tomorrow's Plan
      </Button>
    </Box>
  );
};

export default CalendarPage;
