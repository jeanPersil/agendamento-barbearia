import { existeOuErro, igualOuErro } from "../utils/validator.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  registrar = asyncHandler(async (req, res) => {
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
  });

  registroPeloAdmin = asyncHandler(async (req, res) => {
    const { nome, email, senha, confirmarSenha, telefone, role } = req.body;

    existeOuErro(nome, "O campo nome é obrigatorio");
    existeOuErro(email, "O campo email é obrigatorio");
    existeOuErro(senha, "O campo senha é obrigatorio");
    igualOuErro(senha, confirmarSenha, "As senhas não conferem");
    existeOuErro(telefone, "O campo telefone é obrigatorio");

    const dadosDoUsuario = {
      nome,
      email,
      senha,
      telefone,
      role,
    };

    await this.userService.criarUser({
      data: dadosDoUsuario,
      usuarioSolicitante: req.user,
    });

    return res.status(201).send();
  });

  editar = asyncHandler(async (req, res) => {
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
  });

  listarTodos = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { users, total } = await this.userService.listarTodosUsuarios(
      page,
      limit,
    );

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      data: users,
      meta: {
        totalItems: total,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  };

  buscarPorEmail = async (req, res) => {
    const email = req.body.email;
    const data = await this.userService.buscarUsuarioPorEmail(email);
    return res.status(200).json({
      data: data,
    });
  };

  banir = asyncHandler(async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    existeOuErro(id, "É necessario o id do usuario");
    existeOuErro(data.motivo, "O banimento do usuario deve ter um motivo ");

    await this.userService.banirUsuario(id, data);

    return res.status(200).send();
  });
}
