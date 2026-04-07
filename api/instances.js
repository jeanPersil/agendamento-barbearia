// --- IMPORTAÇÕES DO MÓDULO USER ---
import { UserRepository } from "./modules/user/userRepository.js";
import { UserService } from "./modules/user/userService.js";
import { UserController } from "./modules/user/userController.js";

// --- IMPORTAÇÕES DO MÓDULO SERVICO ---
import { ServicoController } from "./modules/servico/servicoController.js";
import { ServicosRepository } from "./modules/servico/ServicosRepositoy.js";
import { ServicoService } from "./modules/servico/servicoService.js";

// --- IMPORTAÇÕES DO MÓDULO AGENDAMENTO ---
import { AgendamentoRepository } from "./modules/agendamento/agendamentoRepository.js";
import { AgendamentoService } from "./modules/agendamento/agendamentoService.js";
import { AgendamentoController } from "./modules/agendamento/agendamentoController.js";

// --- IMPORTAÇÕES DO MÓDULO AUTH ---
import { AuthController } from "./modules/auth/authController.js";
import { AuthService } from "./modules/auth/authService.js";

// ==========================================
// INSTANCIAS
// ==========================================

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

// Instancia de auth
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

export {
  userController,
  servicoController,
  agendamentoController,
  authController,
};
