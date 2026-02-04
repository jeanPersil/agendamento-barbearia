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
}
