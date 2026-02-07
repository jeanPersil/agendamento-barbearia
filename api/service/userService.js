import bcrypt from "bcrypt";
import { naoExisteOuErro } from "../validator.js";

export class UserService {
  constructor(userRepository) {
    this.userRepo = userRepository;
  }

  criarUser = async (data) => {
    const userComMesmoEmail = await this.userRepo.findByEmail(data.email);
    naoExisteOuErro(
      userComMesmoEmail,
      "Já existe uma conta cadastrada com este e-mail.",
    );

    const salt = bcrypt.genSaltSync(10);
    const senhaCriptografada = bcrypt.hashSync(data.senha, salt);

    let roleParaSalvar = data.role;

    if (!roleParaSalvar) {
      roleParaSalvar = "CLIENTE";
    }

    const rolesValidas = ["CLIENTE", "PROFISSIONAL", "ADMIN"];
    if (!rolesValidas.includes(roleParaSalvar)) {
      throw new Error("Tipo de usuário inválido.");
    }

    const dadosParaSalvar = {
      nome: data.nome,
      email: data.email,
      senha: senhaCriptografada,
      telefone: data.telefone,
      role: roleParaSalvar, 
      // imagemUrl: data.imagemUrl,
    };

    return this.userRepo.create(dadosParaSalvar);
  };
  editarUser = async (userId, data) => {
    const dadosParaAtualizar = {};

    if (data.nome) dadosParaAtualizar.nome = data.nome;
    if (data.telefone) dadosParaAtualizar.telefone = data.telefone;
    if (data.admin !== undefined) dadosParaAtualizar.admin = data.admin;

    if (data.email) {
      const userComMesmoEmail = await this.userRepo.findByEmail(data.email);

      if (userComMesmoEmail && userComMesmoEmail.id !== userId) {
        throw { statusCode: 400, message: "Este email já está em uso." };
      }

      dadosParaAtualizar.email = data.email;
    }

    if (data.senha) {
      const salt = bcrypt.genSaltSync(10);
      dadosParaAtualizar.senha = bcrypt.hashSync(data.senha, salt);
    }

    return this.userRepo.update(userId, dadosParaAtualizar);
  };

  listarTodosUsuarios = async () => {
    return this.userRepo.findAll({
      select: {
        id: true,
        nome: true,
        telefone: true,
        email: true,
        bannedAt: true,
        bannedReason: true,
      },
    });
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
