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
const auth = passport.authenticate();

// Auth
router.post("/auth", authController.login);
router.post("/auth/register", userController.registrar);

// Usuários
router.get("/user", userController.listarTodos);
router.post("/user", auth, verificarAdmin, userController.registroPeloAdmin);
router.put("/user/:id", auth, verificarAdmin, userController.editar);
router.put("/user/:id/ban", auth, verificarAdmin, userController.banir);
router.put(
  "/user/:id/removeBan",
  auth,
  verificarAdmin,
  userController.removeBan,
);

// Serviços
router.get("/servico", servicoController.listar);
router.post("/servico", servicoController.salvar);
router.put("/servico/:id", auth, verificarAdmin, servicoController.editar);
router.delete("/servico/:id", auth, verificarAdmin, servicoController.deletar);

// Agendamentos
router.post("/agendamento", auth, agendamentoController.criar);
router.get("/agendamento", auth, agendamentoController.horariosDisponibilidade);

export default router;
