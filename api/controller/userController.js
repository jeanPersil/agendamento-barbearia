import { existeOuErro, igualOuErro } from "../validator.js";
import { UserService } from "../service/userService.js";

const userService = new UserService();

class UserController {
  salvar = async (req, res) => {
    const userData = req.body;

    try {
      existeOuErro(userData.nome, "O campo nome é obrigatorio");
      existeOuErro(userData.email, "O campo email é obrigatorio");
      existeOuErro(userData.senha, "O campo senha é obrigatorio");
      igualOuErro(
        userData.senha,
        userData.confirmarSenha,
        "As senhas não conferem",
      );
      existeOuErro(userData.telefone, "O campo telefone é obrigatorio");

      await userService.criarUser(userData);
      return res.status(201).send();
    } catch (error) {
      const status = error.statusCode || 500;
      const msg = error.statusCode ? error.message : "Erro interno inesperado.";

      if (status === 500) console.error("ERRO 500:", error);

      return res.status(status).send(msg);
    }
  };

  editar = async (req, res) => {
    const userData = req.body;
    const idUrl = req.params.id;
    try {
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

      await userService.editarUser(idUrl, userData);

      return res.status(200).send();
    } catch (error) {
      const status = error.statusCode || 500;
      const msg = error.statusCode ? error.message : "Erro interno inesperado.";

      if (status === 500) console.error("ERRO 500:", error);

      return res.status(status).send(msg);
    }
  };

  listarTodos = async (req, res) => {
    const data = await userService.listarTodosUsuarios();
    return res.status(200).json({
      data: data,
    });
  };

  banir = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    try {
      existeOuErro(id, "É necessario o id do usuario");
      existeOuErro(data.motivo, "O banimento do usuario deve ter um motivo ");

      await userService.banirUsuario(id, data);
      return res.status(200).send();
      
    } catch (error) {
      const status = error.statusCode || 500;
      const msg = error.statusCode ? error.message : "Erro interno inesperado.";

      if (status === 500) console.error("ERRO 500:", error);

      return res.status(status).send(msg);
    }
  };
}

export { UserController };
