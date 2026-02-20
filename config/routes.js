import express from "express";
import {
  userController,
  servicoController,
  agendamentoController,
  authController,
} from "../api/instances.js";

import passport from "../middlewares/passport.js";
import { verificarAdmin } from "../middlewares/admin.js";

const router = express.Router();

router.route("/auth").post(authController.login);
router.route("/auth/register").post(userController.registrar);

router
  .route("/user")
  .post(
    passport.authenticate(),
    verificarAdmin,
    userController.registroPeloAdmin,
  )
  .get(userController.listarTodos); // admin

router
  .route("/user/:id/ban")
  .put(passport.authenticate(), verificarAdmin, userController.banir); // admin
router
  .route("/user/:id")
  .put(passport.authenticate(), verificarAdmin, userController.editar); // admin

router
  .route("/servico")
  .post(passport.authenticate(), verificarAdmin, servicoController.salvar) // admin
  .get(passport.authenticate(), servicoController.listar);

router
  .route("/servico/:id")
  .put(passport.authenticate(), verificarAdmin, servicoController.editar) //admin
  .delete(passport.authenticate(), verificarAdmin, servicoController.deletar); //admin

router
  .route("/agendamento")
  .post(passport.authenticate(), agendamentoController.criar)
  .get(passport.authenticate(), agendamentoController.horariosDisponibilidade);

export default router;
