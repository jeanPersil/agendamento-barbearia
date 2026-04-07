import express from "express";
import {
  userController,
  servicoController,
  agendamentoController,
  authController,
} from "../api/instances.js";

import { userRoutes } from "../api/modules/user/userRoute.js";

import passport from "../middlewares/passport.js";
import { verificarAdmin } from "../middlewares/admin.js";

const routes = express.Router();
const auth = passport.authenticate();

// Usuários
routes.use("/user", userRoutes);


export default routes;
