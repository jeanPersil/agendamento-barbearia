import { UserRepository } from "./repositories/UserRepository.js";
import { UserService } from "./service/userService.js";
import { UserController } from "./controller/userController.js";

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

const userController = new UserController(userService);

export { userController };
