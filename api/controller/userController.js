import { existeOuErro, igualOuErro } from "../utils/validator.js";
import { handleError } from "../utils/errors.js";

export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  registrar = async (req, res) => {
    try {
      const userData = req.body;

      existeOuErro(userData.nome, "O campo nome é obrigatorio");
      existeOuErro(userData.email, "O campo email é obrigatorio");
      existeOuErro(userData.senha, "O campo senha é obrigatorio");
      igualOuErro(
        userData.senha,
        userData.confirmarSenha,
        "As senhas não conferem",
      );
      existeOuErro(userData.telefone, "O campo telefone é obrigatorio");

      await this.userService.criarUser(userData, null);
      return res.status(201).send();
    } catch (error) {
      return handleError(res, error);
    }
  };

  registroPeloAdmin = async (req, res) => {
    try {
      const { nome, email, senha, confirmarSenha, telefone, role } = req.body;

      existeOuErro(nome, "O campo nome é obrigatorio");
      existeOuErro(email, "O campo email é obrigatorio");
      existeOuErro(senha, "O campo senha é obrigatorio");
      igualOuErro(senha, confirmarSenha, "As senhas não conferem");
      existeOuErro(telefone, "O campo telefone é obrigatorio");

      await this.userService.criarUser({
        data: { nome, email, senha, telefone, role },
        usuarioSolicitante: req.user,
      });

      return res.status(201).send();
    } catch (error) {
      return handleError(res, error);
    }
  };

  editar = async (req, res) => {
    try {
      const userData = req.body;
      const idUrl = req.params.id;

      existeOuErro(idUrl, "Usuario não encontrado");

      if (userData.nome !== undefined) {
        existeOuErro(userData.nome, "Nome não pode ser vazio");
      }
      if (userData.email !== undefined) {
        existeOuErro(userData.email, "Email não pode ser vazio");
      }
      if (userData.senha !== undefined) {
        existeOuErro(userData.senha, "Senha não pode ser vazia");
        igualOuErro(
          userData.senha,
          userData.confirmarSenha,
          "As senhas não conferem",
        );
      }
      if (userData.telefone !== undefined) {
        existeOuErro(userData.telefone, "Telefone não pode ser vazio");
      }

      await this.userService.editarUser(idUrl, userData);
      return res.status(200).send();
    } catch (error) {
      return handleError(res, error);
    }
  };

  listarTodos = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const { nome, tipo, status } = req.query;

      const { users, total, totalPages } =
        await this.userService.listarUsuarios({
          page,
          limit,
          nome,
          tipo,
          status,
        });

      return res.status(200).json({
        data: users,
        meta: {
          totalItems: total,
          totalPages: totalPages,
          currentPage: page,
          itemsPerPage: limit,
        },
      });
    } catch (error) {
      return handleError(res, error);
    }
  };

  banir = async (req, res) => {
    try {
      const { motivo } = req.body;
      const id = req.params.id;

      existeOuErro(id, "É necessario o id do usuario");
      existeOuErro(motivo, "O banimento do usuario deve ter um motivo");

      await this.userService.banirUsuario(id, motivo);
      return res.status(200).send();
    } catch (error) {
      return handleError(res, error);
    }
  };

  removeBan = async (req, res) => {
    try {
      const userId = req.params.id;

      existeOuErro(id, "É necessario o id do usuario.");

      await this.userService.desbanirUsuario({ idUsuario: userId });
    } catch (error) {
      return handleError(res, error);
    }
  };
}
