import bcrypt from "bcrypt";
import { naoExisteOuErro } from "../validator.js";

class UserService {
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

    const dadosParaSalvar = {
      nome: data.nome,
      email: data.email,
      senha: senhaCriptografada,
      telefone: data.telefone,
      admin: data.admin || false,
    };

    if (data.role === "CLIENTE") {
      dadosParaSalvar.cliente = { create: {} };
    } else if (data.role === "PROFISSIONAL") {
      dadosParaSalvar.profissional = { create: {} };
    }

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
      },
    });
  };

  async banirUsuario(idUsuario, data) {
    return this.userRepo.update(idUsuario, {
      bannedAt: new Date(),
      bannedReason: data.motivo,
    });
  }
}

export { UserService };
