import express from "express";

const router = express.Router();

// Landing Page
router.get("/", (req, res) => {
  res.render("landing");
});

// Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

// Reset password Page
router.get("/forgot-password", (req, res) => {
  res.render("resetPassword");
});

// Function to reset password called by the Reset password Page
router.post("/reset-password", (req, res) => {});

// Register Page
router.get("/register", (req, res) => {
  res.render("register");
});

// Videos Page
router.get("/videos", (req, res) => {
  // Fetch videos from Google Drive or any other source
  const videos = [
    { title: "Video 1", completed: false },
    { title: "Video 2", completed: false },
    // Add more videos here
  ];
  res.render("videos", { videos });
});

export default router;
