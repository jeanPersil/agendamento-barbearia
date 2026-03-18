import bcrypt from "bcrypt";
import { naoExisteOuErro } from "../utils/validator.js";

import { ForbiddenError, ValidationError } from "../utils/errors.js";

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
    if (data.role) dadosParaAtualizar.role = data.role;

    if (data.email) {
      const userComMesmoEmail = await this.userRepo.findByEmail(data.email);

      if (userComMesmoEmail && userComMesmoEmail.id !== userId) {
        throw new ValidationError(
          "Já existe uma conta cadastrada com este e-mail.",
        );
      }

      dadosParaAtualizar.email = data.email;
    }

    return this.userRepo.update(userId, dadosParaAtualizar);
  };

  listarUsuarios = async ({ page = 1, limit = 10, nome, tipo, status }) => {
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where = {};

    if (nome) {
      where.nome = { contains: nome };
    }

    if (tipo) {
      where.role = tipo;
    }

    if (status) {
      if (status === "banido") {
        where.bannedAt = { not: null };
      } else if (status === "ativo") {
        where.bannedAt = null;
      }
    }

    const options = {
      where,
      skip,
      take,
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
      this.userRepo.count({ where }),
    ]);

    return {
      users,
      total,
      totalPages: Math.ceil(total / take),
      currentPage: Number(page),
    };
  };

  async banirUsuario(idUsuario, motivo) {
    return this.userRepo.update(idUsuario, {
      bannedAt: new Date(),
      bannedReason: motivo,
    });
  }

  async desbanirUsuario({ idUsuario }) {
    return this.userRepo.update(idUsuario, {
      bannedAt: null,
      bannedReason: null,
    });
  }

  async deletarUsuario(id) {
    return this.userRepo.delete(id);
  }
}
