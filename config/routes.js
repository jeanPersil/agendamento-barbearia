import express from "express";
import { UserController } from "../api/controller/userController.js";

const userController = new UserController();
const router = express.Router();

router
  .route("/user")
  .post(userController.salvar)
  .get(userController.listarTodos);

router.route("/user/:id/ban").put(userController.banir);

router.route("/user/:id").put(userController.editar);

export default router;
