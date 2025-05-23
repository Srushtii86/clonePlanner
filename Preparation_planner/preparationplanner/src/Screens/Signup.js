import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import bgImage from "../Images/loginbg.png";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // "success" | "error"

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSnackbarSeverity("error");
        setSnackbarMessage(data.message || "Signup failed");
        setSnackbarOpen(true);
        return;
        //throw new Error("Signup failed");
      }
      setSnackbarSeverity("success");
      setSnackbarMessage("Signup successful! Redirecting to login...");
      setSnackbarOpen(true);
      setName("");
      setEmail("");
      setPassword("");
      // Delay navigation to show Snackbar
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Signup failed. Please try again.");
      setSnackbarOpen(true);
    }
  };
  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1, // Push background behind everything
        }}
      />

      {/* Signup Form */}
      <Container
        component="main"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: { xs: 3, sm: 4, md: 5 },
            borderRadius: 2,
            boxShadow: 3, // Ensures shadow effect
            width: { xs: "90%", sm: "80%", md: "400px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontWeight: "bold", color: "#008080" }}
          >
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSignup}
          >
            <TextField
              fullWidth
              required
              label="Name"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              required
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              required
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#008080", color: "white" }}
            >
              Sign Up
            </Button>

            <Button
              fullWidth
              variant="text"
              sx={{
                mt: 1,
                color: "#008080",
                textTransform: "none",
                "&:hover": { backgroundColor: "transparent", color: "#006666" },
              }}
              onClick={() => navigate("/login")}
            >
              Already a user? Login
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Snackbar Component */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
