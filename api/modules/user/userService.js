import bcrypt from "bcrypt";
import { notExistOrError } from "../../utils/validator.js";
import { UserEntity } from "./Entity/user.entity.js";

export class UserService {
  list = [];

  constructor(userRepository) {
    this.userRepo = userRepository;
  }

  createUser = async ({ createUserDTO }) => {
    const emailAlreadyRegistered = await this.userRepo.findByEmail(
      createUserDTO.email,
    );

    notExistOrError(
      emailAlreadyRegistered,
      "Já existe uma conta cadastrada com este e-mail.",
    );

    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(createUserDTO.password, salt);

    const newUser = new UserEntity({
      ...createUserDTO,
      password: encryptedPassword,
      role: 0,
    });

    const user = await this.userRepo.create(newUser);

    return user;
  };
}
