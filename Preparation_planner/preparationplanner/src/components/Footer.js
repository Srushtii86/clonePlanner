import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = ({ isAuthenticated }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#36454F	",
        borderRadius: "7px",
        padding: "3%",
        // marginTop: "20px",
        textAlign: "center",
      }}
    >
      {/* Navigation Links */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          marginBottom: "10px",
        }}
      >
        {isAuthenticated ? (
          <>
            <Link href="/home" color="white" underline="none">
              Home
            </Link>
            <Link href="/dashboard" color="white" underline="none">
              Dashboard
            </Link>
            <Link href="/calendar" color="white" underline="none" >
              Calendar
            </Link>
            <Link href="/about" color="white" underline="none">
              About
            </Link>
          </>
        ) : (
          <>
            <Link href="/" color="white" underline="none">
              Home
            </Link>
            <Link href="/about" color="white" underline="none">
              About
            </Link>
          </>
        )}
      </Box>

      {/* Horizontal Line */}
      <Box
        sx={{
          borderBottom: "1px solid white",
          marginBottom: "10px",
        }}
      />

      {/* Copyright Text */}
      <Typography variant="body1" color="white">
        © 2025 PrepPlanner, Inc
      </Typography>
    </Box>
  );
};

export default Footer;
