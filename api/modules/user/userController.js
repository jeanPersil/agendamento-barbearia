import { existeOuErro, igualOuErro } from "../../utils/validator.js";
import { handleError } from "../../utils/errors.js";
import { ReturnUserDTO } from "./Dtos/returnUser.dto.js";

export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  createUser = async (req, res) => {
    try {
      const userData = req.body;

      const returnUserDTO = new ReturnUserDTO(
        await this.userService.createUser({
          createUserDTO: userData,
        }),
      );

      return res.status(201).json(returnUserDTO);
    } catch (error) {
      return handleError(res, error);
    }
  };
}
