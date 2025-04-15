import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import heroAnimation from "../Animations/LandingAnimation.json";
import Step1 from "../GIFs/Step1.gif";
import Step2 from "../GIFs/Step2.gif";
import Step3 from "../GIFs/Step3.png";
import Step4 from "../GIFs/Step4.gif";

export default function Landing() {
  const navigate = useNavigate();

  const handleSelectPlan = () => {
    navigate("/signup");
  };

  return (
    <Box bgcolor="white">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "90vh",
          background: "linear-gradient(135deg, #006A4E, #219298)",
          padding: 2,
          gap: { xs: 4, md: 0 },
        }}
      >
        {/* Text Section */}
        <Container
          maxWidth="sm"
          sx={{ order: { xs: 2, md: 1 }, textAlign: "left" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h2"
              fontWeight="bold"
              color="white"
              gutterBottom
            >
              PREP SMARTER
            </Typography>
            <Typography variant="h5" color="white" paragraph>
              PERSONALIZED PLANS FOR PERFECT PREPARATION
            </Typography>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSelectPlan}
                sx={{ backgroundColor: "#FFB400", color: "black" }}
              >
                SIGN IN TO GET STATRED
              </Button>
            </motion.div>
          </motion.div>
        </Container>

        {/* Animation Section */}
        <Box sx={{ order: { xs: 1, md: 2 }, marginLeft: { xs: 0, md: -6 } }}>
          <Lottie
            animationData={heroAnimation}
            style={{ height: 400, width: "auto" }}
          />
        </Box>
      </Box>

      {/* Steps Section */}
      <Box sx={{ padding: 4, textAlign: "center", minHeight: "600px" }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(90deg, #006A4E, #219298)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          marginTop={'3%'}
          marginBottom={'2%'}
          gutterBottom
        >
          Ace Your Exam in 4 Steps
        </Typography>

        <Box
          sx={{
            // backgroundColor: "rgba(5, 125, 89, 0.2)", // Semi-transparent green
            background: "linear-gradient(135deg, #006A4E, #219298)",
            borderRadius: "12px",
            padding: 4,
            display: "flex",
            width: { xs: "90%", md: "90%" },
            minHeight: { xs: "300px", md: "400px" },
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            margin: "0 auto",
          }}
        >
          {[
            {
              img: Step1,
              title: "Set Your Goal",
              desc: "Tell us your exam details & schedule.",
            },
            {
              img: Step2,
              title: "Get a Custom Plan",
              desc: "We create a plan based on your needs.",
            },
            {
              img: Step3,
              title: "Follow & Track",
              desc: "Stay on track with daily recommendations.",
            },
            {
              img: Step4,
              title: "Succeed!",
              desc: "Ace your exam with a structured approach.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  padding: 3,
                  textAlign: "center",
                  boxShadow: 3,
                  borderRadius: "12px",
                  backgroundColor: "white",
                  width: '70%'
                }}
              >
                <img
                  src={step.img}
                  alt={`Step ${index + 1}`}
                  style={{ height: 100, width: "50%", objectFit: "cover" }}
                />
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.desc}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
