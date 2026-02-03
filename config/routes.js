import express from "express";
import { userController } from "../api/instances.js";

const router = express.Router();

router
  .route("/user")
  .post(userController.salvar)
  .get(userController.listarTodos);

router.route("/user/:id/ban").put(userController.banir);

router.route("/user/:id").put(userController.editar);

export default router;
