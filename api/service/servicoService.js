import { naoExisteOuErro, existeOuErro } from "../utils/validator.js";

export class ServicoService {
  constructor(servicoRepository) {
    this.servicoRepo = servicoRepository;
  }

  criarServico = async (data) => {
    const servicoComMesmoNome = await this.servicoRepo.findOne({
      nome: data.nome,
    });

    naoExisteOuErro(
      servicoComMesmoNome,
      "Já existe um serviço cadastrado com este nome.",
    );

    const dadosParaSalvar = {
      nome: data.nome,
      descricao: data.descricao,
      preco: data.preco,
      duracaoMin: data.duracao,
    };

    return this.servicoRepo.create(dadosParaSalvar);
  };

  async editarServico(id, data) {
    const servico = await this.servicoRepo.findOne({ id: id });

    existeOuErro(servico, "Serviço não encontrado.");

    const dadosParaAtualizar = {};

    if (data.nome) {
      const servicoComMesmoNome = await this.servicoRepo.findOne({
        nome: data.nome,
      });
      naoExisteOuErro(
        servicoComMesmoNome,
        "Já existe um serviço cadastrado com este nome.",
      );
      dadosParaAtualizar.nome = data.nome;
    }

    if (data.descricao) dadosParaAtualizar.descricao = data.descricao;
    if (data.preco) dadosParaAtualizar.preco = data.preco;
    if (data.duracao) dadosParaAtualizar.duracaoMin = data.duracao;

    return this.servicoRepo.update(id, dadosParaAtualizar);
  }

  async listarServicos({ page = 1, limit = 10 }) {
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where = {};

    const options = {
      where,
      skip,
      take,
      select: {
        id: true,
        nome: true,
        descricao: true,
        preco: true,
        duracaoMin: true,
      },
      orderBy: {
        id: "desc",
      },
    };

    const [servicos, total] = await Promise.all([
      this.servicoRepo.findAll(options),
      this.servicoRepo.count({ where }),
    ]);

    return {
      servicos,
      total,
      totalPages: Math.ceil(total / take),
      currentPage: Number(page),
    };
  }

  async deletarServico(id) {
    const servico = await this.servicoRepo.findOne({ id: id });
    existeOuErro(servico, "Serviço não encontrado.");

    return this.servicoRepo.delete(id);
  }
}
