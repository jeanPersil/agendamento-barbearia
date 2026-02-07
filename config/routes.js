import express from "express";
import {
  userController,
  servicoController,
  agendamentoController,
  authController,
} from "../api/instances.js";

const router = express.Router();

router.route("/auth").post(authController.login);

router
  .route("/user")
  .post(userController.salvar)
  .get(userController.listarTodos);

router.route("/user/:id/ban").put(userController.banir);
router.route("/user/:id").put(userController.editar);

router
  .route("/servico")
  .post(servicoController.salvar)
  .get(servicoController.listar);

router
  .route("/servico/:id")
  .put(servicoController.editar)
  .delete(servicoController.deletar);

router
  .route("/agendamento")
  .post(agendamentoController.criar)
  .get(agendamentoController.horariosDisponibilidade);

export default router;
