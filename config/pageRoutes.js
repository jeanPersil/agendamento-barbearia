import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/dashboard", (req, res) => { 
  res.sendFile(path.join(__dirname, "../public/dashboard.html"));
});

router.get("/usuarios", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/user.html"));
});

router.get("/servicos", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/servico.html"));
});

router.get("/agenda", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/agenda.html"));
});

export default router;
