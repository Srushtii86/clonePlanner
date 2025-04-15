import React from "react";
import { Box, Typography, Container, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, white, #d4f5e6)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "5%",
      }}
    >
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(90deg, #006A4E, #219298)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
          }}
          gutterBottom
        >
          About PrepPlanner
        </Typography>
      </motion.div>

      {/* Introduction Section */}
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Typography variant="h5" textAlign="center" color="text.secondary" gutterBottom>
            Your Personalized Study Guide for Exam Success!
          </Typography>
        </motion.div>
      </Container>

      {/* New Content Section */}
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Typography variant="h5" fontWeight="bold" textAlign="center" color="#006A4E" gutterBottom>
            Traditional Study Methods vs. PrepPlanner
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            In the past, study tools were limited to generic to-do lists and static courses that lacked flexibility.
            They didn’t adapt to your time, needs, or schedule. With PrepPlanner, we revolutionize learning by
            generating dynamic, personalized plans tailored to your availability and learning style. No more one-size-fits-all approaches—
            your study journey is now designed for you, by you**!
          </Typography>
        </motion.div>
      </Container>

      {/* Feature Sections */}
      <Grid container spacing={4} justifyContent="center" marginTop={4}>
        {[
          { title: "Personalized Plans", desc: "AI-driven study schedules tailored just for you." },
          { title: "Smart Tracking", desc: "Monitor progress and adjust plans dynamically." },
          { title: "Expert Resources", desc: "Handpicked study materials and problem sets." },
          { title: "Stay Motivated", desc: "Daily goals and progress insights to keep you on track." },
        ].map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Card
                sx={{
                  backgroundColor: "white",
                  boxShadow: 3,
                  borderRadius: "12px",
                  textAlign: "center",
                  padding: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Call-to-Action */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        style={{ marginTop: "5%" }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="#006A4E"
          sx={{
            padding: "10px 20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: 3,
            cursor: "pointer",
          }}
        >
          Start Your Prep Journey Today 🚀
        </Typography>
      </motion.div>
    </Box>
  );
};

export default About;
