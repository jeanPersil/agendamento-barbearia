import express from "express";
import { UserController } from "../api/controller/userController.js";

const userController = new UserController();
const router = express.Router();

router.post("/user", userController.salvarUser);

export default router