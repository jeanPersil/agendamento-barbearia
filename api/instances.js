import { UserRepository } from "./repositories/UserRepository.js";
import { UserService } from "./service/userService.js";
import { UserController } from "./controller/userController.js";

import { ServicoController } from "./controller/servicoController.js";
import { ServicosRepository } from "./repositories/ServicosRepositoy.js";
import { ServicoService } from "./service/servicoService.js";

import { AgendamentoRepository } from "./repositories/agendamentoRepository.js";
import { AgendamentoService } from "./service/agendamentoService.js";
import { AgendamentoController } from "./controller/agendamentoController.js";

import { AuthController } from "./controller/authController.js";
import { AuthService } from "./service/authService.js";

// Instancia de usuario
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Instancia de servico
const servicoRepository = new ServicosRepository();
const servicoService = new ServicoService(servicoRepository);
const servicoController = new ServicoController(servicoService);

// Instancia de agendamento
const agendamentoRepository = new AgendamentoRepository();
const agendamentoService = new AgendamentoService(agendamentoRepository);
const agendamentoController = new AgendamentoController(agendamentoService);

//instancia de auth
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

export {
  userController,
  servicoController,
  agendamentoController,
  authController,
};
