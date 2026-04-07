import { existeOuErro } from "../../utils/validator.js";
import { handleError } from "../../utils/errors.js";

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
      handleError(res, error);
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
      handleError(res, error);
    }
  };

  listar = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const { servicos, total, totalPages } =
        await this.servicoService.listarServicos({ page, limit });
      return res.status(200).json({
        data: servicos,
        meta: {
          totalItens: total,
          totalPages: totalPages,
          currentpage: page,
          itemsForPage: limit,
        },
      });
    } catch (error) {
      handleError(res, error);
    }
  };

  deletar = async (req, res) => {
    const id = req.params.id;

    console.log(id);
    try {
      existeOuErro(id, "É necessario o id do servico");
      await this.servicoService.deletarServico(id);

      return res.status(200).send();
    } catch (error) {
      handleError(res, error);
    }
  };
}
