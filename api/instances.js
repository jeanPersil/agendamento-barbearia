import { UserRepository } from "./repositories/UserRepository.js";
import { UserService } from "./service/userService.js";
import { UserController } from "./controller/userController.js";

import { ServicoController } from "./controller/servicoController.js";
import { ServicosRepository } from "./repositories/ServicosRepositoy.js";
import { ServicoService } from "./service/servicoService.js";

// Instancia de usuario
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Instancia de servico
const servicoRepository = new ServicosRepository();
const servicoService = new ServicoService(servicoRepository);
const servicoController = new ServicoController(servicoService);

export { userController, servicoController };
