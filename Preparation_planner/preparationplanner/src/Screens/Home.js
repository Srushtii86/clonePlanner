import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Grid, Chip } from "@mui/material";

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);

  if (!userData) return <Typography variant="h6" align="center">Loading your plan...</Typography>;

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
            {userData.current_day}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h5" mb={2}>
        🎯 Your Goals
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ width: "90%", maxWidth: "900px" }}>
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
                      userData.completedGoals && userData.completedGoals.includes(goal)
                        ? "Completed ✅"
                        : "Not Completed ❌"
                    }
                    color={
                      userData.completedGoals && userData.completedGoals.includes(goal)
                        ? "success"
                        : "warning"
                    }
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

