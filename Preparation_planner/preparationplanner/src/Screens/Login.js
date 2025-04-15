import React, { useEffect, useState } from "react";
import { Button, TextField, Box, Typography, Container, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../Images/loginbg.png"; // Ensure correct path

export default function Login({ handleLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();  // 🔥 Prevent page refresh on form submit
    setLoading(true);
    setError(""); 

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {  // ✅ Corrected URL
        email,
        password,
    });
      console.log("Login response:", response.data);

      if (response.data.token) {
        const { token, user } = response.data;
        localStorage.setItem("token", response.data.token);  // 🔥 Store token
        localStorage.setItem("user", JSON.stringify(response.data.user));
        const userResponse = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        });
        console.log("User profile response:", userResponse.data);
        handleLogin(token, userResponse.data.user);
        navigate("/home"); // Redirect after login
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
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
          zIndex: -1,
        }}
      />

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
            boxShadow: 3,
            width: { xs: "90%", sm: "80%", md: "400px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", color: "#008080" }}>
            Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleLoginSubmit}>
            <TextField
              fullWidth
              required
              label="Email"
              type="email"
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
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
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
              onClick={() => navigate("/signup")}
            >
              New user? Sign up
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
