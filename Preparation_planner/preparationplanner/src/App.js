import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Landing from "./Screens/Landing";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import DashboardPage from "./Screens/DashboardPage";
import CalendarPage from "./Screens/CalendarPage";
import Signup from "./Screens/Signup";
import ClassificationForm from "./components/ClassificationForm";
import FormPage from "./Screens/FormPage";
import Footer from "./components/Footer";
import About from "./Screens/About";
//import InitialSurvey from "./Screens/InitialSurvey"; // ✅ Import survey
import HomeWrapper from "./Screens/HomeWrapper";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    if (token) {
      fetch("http://localhost:5000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("User data:", data); // DEBUG LOG
          setUser(data);
          setIsSurveyCompleted(data.isSurveyCompleted ?? false);
        })
        .catch(() => setIsSurveyCompleted(false));
    }
  }, []);

  const handleLogin = (token, user) => {
    console.log("User object in handleLogin:", user); // Debugging
    if (!user || typeof user !== "object") {
      console.error("Invalid user object:", user);
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token); // Ensure token is stored
    setIsAuthenticated(true);
    setUser(user);
    setIsSurveyCompleted(user.firstLogin === false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    // setIsSurveyCompleted(false);
    setUser(null);
  };

  return (
    <Router>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route
              path="/home"
              element={
                <HomeWrapper
                  user={user}
                  setUser={setUser}
                  isSurveyCompleted={isSurveyCompleted}
                  setIsSurveyCompleted={setIsSurveyCompleted}
                />
              }
            />

            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* <Route path="/calendar" element={<CalendarPage />} /> */}
            <Route path="/calendar" element={<CalendarPage user={user} />} />
            <Route
              path="/signup"
              element={<Signup handleLogin={handleLogin} />}
            />
            <Route path="/classification" element={<ClassificationForm />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="*" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer isAuthenticated={isAuthenticated} />
      </div>
    </Router>
  );
}

export default App;
