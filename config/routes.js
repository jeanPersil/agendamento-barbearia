import express from "express";
import { UserController } from "../api/controller/userController.js";

const userController = new UserController();
const router = express.Router();

router.route("/user").post(userController.salvar);

router.route("/user/:id").put(userController.editar);

export default router;
