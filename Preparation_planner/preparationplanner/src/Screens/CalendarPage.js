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
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setLoading(false);
      });
  }, []);

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
          {/* {tasks.map((task, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  backgroundColor: "#ffffff",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {task.goal}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Topic: {task.topic}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Subtopic: {task.subtopic}
                  </Typography>
                  <Chip label={`⏳ ${task.estimated_hours} hrs`} sx={{ mt: 1 }} />

                  <Box mt={2}>
                    <a
                      href={task.documentation}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Chip label="📄 Documentation" clickable color="primary" sx={{ mr: 1 }} />
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
          ))} */}
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
    </Box>
  );
};

export default CalendarPage;
