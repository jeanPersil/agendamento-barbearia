import bcrypt from "bcrypt";
import {
  ValidationError,
  naoExisteOuErro,
  ForbiddenError,
} from "../utils/validator.js";

export class UserService {
  constructor(userRepository) {
    this.userRepo = userRepository;
  }

  criarUser = async ({ data, usuarioSolicitante }) => {
    const userComMesmoEmail = await this.userRepo.findByEmail(data.email);
    naoExisteOuErro(
      userComMesmoEmail,
      "Já existe uma conta cadastrada com este e-mail.",
    );

    const salt = bcrypt.genSaltSync(10);
    data.senha = bcrypt.hashSync(data.senha, salt);

    const tentandoCargoAlto = data.role && data.role !== "CLIENTE";
    const naoEAdmin =
      !usuarioSolicitante || usuarioSolicitante.role !== "ADMIN";

    if (tentandoCargoAlto && naoEAdmin) {
      throw new ForbiddenError();
    }

    return this.userRepo.create(data);
  };

  editarUser = async (userId, data) => {
    const dadosParaAtualizar = {};

    if (data.nome) dadosParaAtualizar.nome = data.nome;
    if (data.telefone) dadosParaAtualizar.telefone = data.telefone;
    if (data.admin !== undefined) dadosParaAtualizar.admin = data.admin;

    if (data.email) {
      const userComMesmoEmail = await this.userRepo.findByEmail(data.email);

      if (userComMesmoEmail && userComMesmoEmail.id !== userId) {
        throw new ValidationError(
          "Já existe uma conta cadastrada com este e-mail.",
        );
      }

      dadosParaAtualizar.email = data.email;
    }

    if (data.senha) {
      const salt = bcrypt.genSaltSync(10);
      dadosParaAtualizar.senha = bcrypt.hashSync(data.senha, salt);
    }

    return this.userRepo.update(userId, dadosParaAtualizar);
  };

  listarTodosUsuarios = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const options = {
      skip: skip,
      take: limit,
      select: {
        id: true,
        nome: true,
        telefone: true,
        email: true,
        role: true,
        bannedAt: true,
        bannedReason: true,
      },
      orderBy: {
        id: "desc",
      },
    };

    const [users, total] = await Promise.all([
      this.userRepo.findAll(options),
      this.userRepo.count(),
    ]);

    return { users, total };
  };

  async buscarUsuarioPorEmail(emal) {
    return this.userRepo.findByEmail(emal);
  }

  async banirUsuario(idUsuario, data) {
    return this.userRepo.update(idUsuario, {
      bannedAt: new Date(),
      bannedReason: data.motivo,
    });
  }

  async desbanirUsuario(idUsuario) {
    return this.userRepo.update(idUsuario, {
      bannedAt: null,
      bannedReason: null,
    });
  }

  async deletarUsuario(id) {
    return this.userRepo.delete(id);
  }
}
