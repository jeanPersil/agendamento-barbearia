import express from "express";
import {
  userController,
  servicoController,
  agendamentoController,
  authController,
} from "../api/instances.js";

import passport from "./passport.js";

const router = express.Router();

// rotas de autenticação
router.route("/auth").post(authController.login);

router
  .route("/user")
  .post(userController.salvar)
  .get(passport.authenticate(), userController.listarTodos); // admin

router
  .route("/user/:id/ban")
  .put(passport.authenticate(), userController.banir); // admin
router.route("/user/:id").put(passport.authenticate(), userController.editar); // admin

router
  .route("/servico")
  .post(passport.authenticate(), servicoController.salvar) // admin
  .get(passport.authenticate(), servicoController.listar);

router
  .route("/servico/:id")
  .put(passport.authenticate(), servicoController.editar) //admin
  .delete(passport.authenticate(), servicoController.deletar); //admin

router
  .route("/agendamento")
  .post(passport.authenticate(), agendamentoController.criar)
  .get(passport.authenticate(), agendamentoController.horariosDisponibilidade);

export default router;
