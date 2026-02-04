import { existeOuErro, igualOuErro } from "../validator.js";

export class ServicoController {
  constructor(servicoService) {
    this.servicoService = servicoService;
  }

  salvar = async (req, res) => {
    const servicoData = req.body;

    try {
      existeOuErro(servicoData.nome, "O campo nome é obrigatorio");
      existeOuErro(servicoData.descricao, "O campo descricao é obrigatorio");
      existeOuErro(servicoData.preco, "O campo preco é obrigatorio");
      existeOuErro(servicoData.duracao, "O campo duracao é obrigatorio");

      await this.servicoService.criarServico(servicoData);

      return res.status(201).send();
    } catch (error) {
      const status = error.statusCode || 500;
      const msg = error.statusCode ? error.message : "Erro interno inesperado.";
      if (status === 500) console.error("ERRO 500:", error);
      return res.status(status).send(msg);
    }
  };

  editar = async (req, res) => {
    const id = req.params.id;
    const servicoData = req.body;
    try {
      if (servicoData.nome !== undefined) {
        existeOuErro(servicoData.nome, "Nome não pode ser vazio");
      }

      if (servicoData.descricao !== undefined) {
        existeOuErro(servicoData.descricao, "Descricao não pode ser vazio");
      }

      if (servicoData.preco !== undefined) {
        existeOuErro(servicoData.preco, "Preco não pode ser vazio");
      }

      if (servicoData.duracao !== undefined) {
        existeOuErro(servicoData.duracao, "Duracao não pode ser vazio");
      }

      await this.servicoService.editarServico(id, servicoData);

      return res.status(200).send();
    } catch (error) {
      const status = error.statusCode || 500;
      const msg = error.statusCode ? error.message : "Erro interno inesperado.";
      if (status === 500) console.error("ERRO 500:", error);
      return res.status(status).send(msg);
    }
  };

  listar = async (req, res) => {
    try {
      const data = await this.servicoService.listarServicos();
      return res.status(200).json({
        data: data,
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  deletar = async (req, res) => {
    const id = req.params.id;

    try {
      existeOuErro(id, "É necessario o id do servico");
      await this.servicoService.deletarServico(id);

      return res.status(200).send();
    } catch (error) {
      const status = error.statusCode || 500;
      const msg = error.statusCode ? error.message : "Erro interno inesperado.";
      if (status === 500) console.error("ERRO 500:", error);
      return res.status(status).send(msg);
    }
  };
}
