import { existeOuErro, ValidationError } from "../validator.js";
import { gerarSlots, toHora, toMinutos } from "../helpers.js";

class AgendamentoService {
  constructor(agendamentoRepo) {
    this.agendamentoRepo = agendamentoRepo;
  }

  horariosLivres = async (profissionalId, dataString) => {
    const dataAge = new Date(`${dataString}T00:00:00`);
    const diaSemana = dataAge.getDay();

    const disponibilidade = await this.agendamentoRepo.findDisponibilidade(
      profissionalId,
      diaSemana,
    );

    if (!disponibilidade) {
      throw new ValidationError("Profissional sem disponibilidade");
    }

    const slots = gerarSlots(
      disponibilidade.horaInicio,
      disponibilidade.horaFim,
    );

    const inicioDia = new Date(`${dataString}T00:00:00.000Z`);
    const fimDia = new Date(`${dataString}T23:59:59.999Z`);

    const agendamentos =
      await this.agendamentoRepo.findAgendamentosPorIntervalo(
        profissionalId,
        inicioDia,
        fimDia,
      );

    const ocupados = [];

    for (const ag of agendamentos) {
      if (!ag.horario) continue;

      let total = toMinutos(ag.horario);
      const qtdSlots = Math.ceil(ag.servico.duracaoMin / 30);

      for (let i = 0; i < qtdSlots; i++) {
        ocupados.push(toHora(total));
        total += 30;
      }
    }

    const livres = slots.filter((h) => !ocupados.includes(h));

    return livres;
  };

  criarAgendamento = async (dadosAgendamento) => {
    const { clienteId, profissionalId, servicoId, data, horario } =
      dadosAgendamento;

    const servico = await this.agendamentoRepo.findServicoById(servicoId);

    if (!servico) {
      ValidationError("Serviço não econtrado.");
    }

    const agendamentos = await this.agendamentoRepo.findAgendamentosDoDia(
      profissionalId,
      new Date(data),
    );

    let totalNovo = toMinutos(horario);
    const slotsNovo = [];
    const slotsNecessarios = servico.duracaoMin / 30;

    for (let i = 0; i < slotsNecessarios; i++) {
      slotsNovo.push(toHora(totalNovo));
      totalNovo += 30;
    }

    for (const ag of agendamentos) {
      if (!ag.horario) continue;

      let totalExistente = toMinutos(ag.horario);
      const slotsExistentes = ag.servico.duracaoMin / 30;

      for (let i = 0; i < slotsExistentes; i++) {
        const horaAtual = toHora(totalExistente);

        if (slotsNovo.includes(horaAtual)) {
          throw new ValidationError("Horario disponivel");
        }
        totalExistente += 30;
      }
    }

    const novoAgendamentoData = {
      clienteId,
      profissionalId,
      servicoId,
      data: new Date(data),
      horario,
      precoHistorico: servico.preco,
    };

    return await this.agendamentoRepo.create(novoAgendamentoData);
  };

  alterarStatus = async (id, status) => {
    const agendamento = await this.agendamentoRepo.findById(id);
    existeOuErro(agendamento, "Agendamento não encontrado");

    return await this.agendamentoRepo.update(id, { status });
  };

  async listarAgendamentos() {
    return await this.agendamentoRepo.findAll();
  }
}

export { AgendamentoService };
