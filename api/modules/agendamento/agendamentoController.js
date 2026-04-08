import { existsOrError } from "../../utils/validator.js";
export class AgendamentoController {
  constructor(agendamentoService) {
    this.agenService = agendamentoService;
  }

  criar = async (req, res) => {
    const body = req.body;

    try {
      existsOrError(body.clienteId, "É necessario o id do cliente");
      existsOrError(body.profissionalId, "É necessario o id do profissional");
      existsOrError(body.servicoId, "É necessario o id do servico");

      existsOrError(
        body.data,
        "É necessario a data do agendamento (AAAA-MM-DD)",
      );
      existsOrError(
        body.horario,
        "É necessario o horário do agendamento (HH:mm)",
      );

      await this.agenService.criarAgendamento(body);

      return res.status(201).send();
    } catch (error) {
      const status = error.statusCode || 500;
      const msg = error.statusCode ? error.message : "Erro interno inesperado.";

      if (status === 500) console.error("ERRO 500 NO CONTROLLER:", error);

      return res.status(status).send(msg);
    }
  };

  horariosDisponibilidade = async (req, res) => {
    const { profissionalId, data } = req.body;

    try {
      existsOrError(profissionalId, "É necessario o id do profissional");
      existsOrError(data, "É necessario a data do agendamento");
      const horarios = await this.agenService.horariosLivres(
        profissionalId,
        data,
      );

      return res.json(horarios);
    } catch (error) {
      const status = error.statusCode || 500;
      const msg = error.statusCode ? error.message : "Erro interno inesperado.";
      if (status === 500) console.error("ERRO 500:", error);
      return res.status(status).send(msg);
    }
  };
}
