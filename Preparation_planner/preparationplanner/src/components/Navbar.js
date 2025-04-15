import React, { useState } from "react";
import { AppBar, Box, Toolbar, Typography, Button, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate(); // ✅ Fix: useNavigate inside Navbar

  const toggleDrawer = (open) => {
    setOpenDrawer(open);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    handleLogout();
    navigate("/"); // ✅ Ensure user is redirected after logout
  };

  const pagesAuthenticated = [
    { name: "Home", path: "/home" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Calendar", path: "/calendar" },
    { name: "Logout", path: "/", onClick: handleLogoutClick } // ✅ Fix: Logout navigation
  ];

  const pagesUnauthenticated = [
    { name: "Login", path: "/login" },
    { name: "Signup", path: "/signup" }
  ];

  const pagesToDisplay = isAuthenticated ? pagesAuthenticated : pagesUnauthenticated;

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(0deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1))",
        boxShadow: 15,
        width: "100%",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: "#333",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          PrepPlanner
        </Typography>

        {isMobile ? (
          <IconButton
            color="inherit"
            edge="end"
            onClick={() => toggleDrawer(true)}
            sx={{ color: "#333" }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}>
            {pagesToDisplay.map((page) => (
              <motion.div key={page.name} whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                <Button
                  component={page.name === "Logout" ? "button" : Link} // ✅ Fix: Logout shouldn't be a Link
                  to={page.path}
                  sx={{
                    color: "#333",
                    fontWeight: "bold",
                    marginRight: 3,
                    "&:hover": {
                      color: "#FFB400",
                      borderBottom: "2px solid #FFB400",
                    },
                  }}
                  onClick={page.onClick || undefined} // ✅ Only set onClick for Logout
                >
                  {page.name}
                </Button>
              </motion.div>
            ))}
          </Box>
        )}
      </Toolbar>

      <Drawer anchor="right" open={openDrawer} onClose={() => toggleDrawer(false)}>
        <Box sx={{ width: 250, background: "#f4f4f4", height: "100%" }}>
          {pagesToDisplay.map((page) => (
            <motion.div key={page.name} whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              <Button
                component={page.name === "Logout" ? "button" : Link}
                to={page.path}
                sx={{
                  color: "#333",
                  fontWeight: "bold",
                  width: "100%",
                  textAlign: "left",
                  padding: 2,
                  "&:hover": { backgroundColor: "#FFB400" },
                }}
                onClick={page.onClick || undefined}
              >
                {page.name}
              </Button>
            </motion.div>
          ))}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
