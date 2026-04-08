import bcrypt from "bcrypt";
import { notExistOrError, existsOrError } from "../../utils/validator.js";
import { UserEntity } from "./Entity/user.entity.js";

export class UserService {
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

  updateUser = async ({ userId, updateUserDTO }) => {
    const currentUser = await this.userRepo.findById(userId);

    existsOrError(currentUser, "Esse usuário não existe no nosso sistema");

    if (updateUserDTO.email && updateUserDTO.email !== currentUser.email) {
      const emailOwner = await this.userRepo.findByEmail(updateUserDTO.email);
      notExistOrError(
        emailOwner,
        "Este e-mail já está em uso por outro usuário.",
      );
    }

    const userUpdatedData = new UserEntity({
      ...currentUser,
      ...updateUserDTO,
    });

    const updatedUser = await this.userRepo.update(userId, userUpdatedData);

    return new UserEntity(updatedUser);
  };

  listUsers = async ({ page = 1, limit = 10 }) => {
    const { users, total } = await this.userRepo.findAll(
      Number(page),
      Number(limit),
    );

    const totalPages = Math.ceil(total / limit);

    return {
      data: users.map((user) => new UserEntity(user)),
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages,
      },
    };
  };
}
