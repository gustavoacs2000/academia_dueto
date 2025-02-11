import express from "express";
import path from "path";
import { __dirname } from "../app.js";
const router = express.Router();

// Landing Page
router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "public", "index.html"); // Caminho absoluto
  res.sendFile(filePath, (err) => {
    // Melhor tratamento de erros
    if (err) {
      console.error("Erro ao enviar arquivo:", err); // Log de erro mais informativo
      res.status(err.status || 500).send("Erro ao carregar a página."); // Resposta de erro para o cliente
    }
  });
});

router.get("/Estudio", (req, res) => {
  const filePath = path.join(__dirname, "public", "estudio.html"); // Caminho absoluto
  res.sendFile(filePath, (err) => {
    // Melhor tratamento de erros
    if (err) {
      console.error("Erro ao enviar arquivo:", err); // Log de erro mais informativo
      res.status(err.status || 500).send("Erro ao carregar a página."); // Resposta de erro para o cliente
    }
  });
});

router.get("/AulasEmGrupo", (req, res) => {
  const filePath = path.join(__dirname, "public", "aulasGrupo.html"); // Caminho absoluto
  res.sendFile(filePath, (err) => {
    // Melhor tratamento de erros
    if (err) {
      console.error("Erro ao enviar arquivo:", err); // Log de erro mais informativo
      res.status(err.status || 500).send("Erro ao carregar a página."); // Resposta de erro para o cliente
    }
  });
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
