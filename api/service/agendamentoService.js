import { existeOuErro, naoExisteOuErro } from "../validator.js";

export class AgendamentoService {
  constructor(agendamentoRepository, servicoRepository, userRepository) {
    this.agendamentoRepo = agendamentoRepository;
    this.servicoRepo = servicoRepository;
    this.userRepo = userRepository;
  }

  criarAgendamento = async (data) => {
    const { clienteId, profissionalId, servicoId, dataHora } = data;

    const cliente = await this.userRepo.findById(clienteId);
    existeOuErro(cliente, "Cliente não encontrado.");
    const profissional = await this.userRepo.findById(profissionalId);
    existeOuErro(profissional, "Profissional não encontrado.");
    const servico = await this.servicoRepo.findById(servicoId);
    existeOuErro(servico, "Serviço não encontrado.");

    if (cliente.role === "PROFISSIONAL") {
      throw new Error(
        "O ID informado pertence a um profissional, não a um cliente.",
      );
    }
    
    if (profissional.role !== "PROFISSIONAL") {
      throw new Error("O usuário informado não é um profissional válido.");
    }

    const dataHoraAgendamento = new Date(dataHora);

    const dataPassada = dataHoraAgendamento < new Date();

    if (dataPassada) {
      throw new Error("A data do agendamento deve ser futura.");
    }

    const novoAgendamento = {
      clienteId,
      profissionalId,
      servicoId,
      dataHora: dataHoraAgendamento,
      status: "AGENDADO",
      precoHistorico: servico.preco,
    };

    return await this.agendamentoRepo.create(novoAgendamento);
  };
}
