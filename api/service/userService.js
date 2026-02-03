import prisma from "../prisma.js";
import bcrypt from "bcrypt";
import { naoExisteOuErro } from "../validator.js";

class UserService {
  criarUser = async (data) => {
    const userComMesmoEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });

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

    if (dadosParaSalvar.role === "CLIENTE") {
      dadosParaSalvar.cliente = { create: {} };
    } else if (dadosParaSalvar.role === "PROFISSIONAL") {
      dadosParaSalvar.profissional = { create: {} };
    }

    return prisma.user.create({
      data: dadosParaSalvar,
    });
  };

  editarUser = async (userId, data) => {
    const dadosParaAtualizar = {};

    if (data.nome) dadosParaAtualizar.nome = data.nome;
    if (data.telefone) dadosParaAtualizar.telefone = data.telefone;
    if (data.admin !== undefined) dadosParaAtualizar.admin = data.admin;

    if (data.email) {
      const userComMesmoEmail = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (userComMesmoEmail && userComMesmoEmail.id !== userId) {
        throw { statusCode: 400, message: "Este email já está em uso." };
      }

      dadosParaAtualizar.email = data.email;
    }

    if (data.senha) {
      const salt = bcrypt.genSaltSync(10);
      dadosParaAtualizar.senha = bcrypt.hashSync(data.senha, salt);
    }

    return prisma.user.update({
      where: { id: userId },
      data: dadosParaAtualizar,
    });
  };
}

export { UserService };
