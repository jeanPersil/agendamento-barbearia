import express from "express";
import {
  userController,
  servicoController,
  agendamentoController,
  agendaController,
} from "../api/instances.js";

const router = express.Router();

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
  .route("/agenda")
  .post(agendaController.gerarAgenda)
  .get(agendaController.listarDisponibilidade);

export default router;
