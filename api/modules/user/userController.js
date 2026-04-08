import { existsOrError } from "../../utils/validator.js";
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

  updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const updateUserDTO = req.body;

      const result = await this.userService.updateUser({
        userId: id,
        updateUserDTO: updateUserDTO,
      });

      return res.status(200).json(result);
    } catch (error) {
      return handleError(res, error);
    }
  };

  getAllUsers = async (req, res) => {
    try {
      const { page, limit } = req.query;

      const result = await this.userService.listUsers({
        page: page || 1,
        limit: limit || 10,
      });

      const listUserDto = result.data.map((user) => new ReturnUserDTO(user));

      return res.status(200).json({ data: listUserDto, meta: result.meta });
    } catch (error) {
      return handleError(res, error);
    }
  };
}
