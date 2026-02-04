import { existeOuErro, igualOuErro } from "../validator.js";

export class AgendamentoController {
  constructor(agendamentoService) {
    this.agenService = agendamentoService;
  }

  criar = async (req, res) => {
    const agendamentoData = req.body;

    try {
      existeOuErro(agendamentoData.clienteId, "Cliente não informado.");
      existeOuErro(
        agendamentoData.profissionalId,
        "Profissional não informado.",
      );
      existeOuErro(agendamentoData.servicoId, "Serviço não informado.");
      existeOuErro(agendamentoData.dataHora, "Data e hora não informadas.");

      await this.agenService.criarAgendamento(agendamentoData);
      return res.status(201).send();
      
    } catch (error) {
      const status = error.statusCode || 500;
      const msg = error.statusCode ? error.message : "Erro interno inesperado.";
      if (status === 500) console.error("ERRO 500:", error);
      return res.status(status).send(msg);
    }
  };
}
