import express from "express";
import { userController, servicoController } from "../api/instances.js";

const router = express.Router();

router
  .route("/user")
  .post(userController.salvar)
  .get(userController.listarTodos);

router.route("/user/:id/ban").put(userController.banir);
router.route("/user/:id").put(userController.editar);

router.route("/servico").post(servicoController.salvar);

export default router;
