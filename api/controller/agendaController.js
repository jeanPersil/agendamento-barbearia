import { existeOuErro } from "../validator.js";

existeOuErro;

export class AgendaController {
  constructor(agendaService) {
    this.agendaService = agendaService;
  }

  gerarAgenda = (req, res) => {
    this.agendaService.gerarAgendaFutura().then(() => res.status(201).send());
  };

  listarDisponibilidade = async (req, res) => {
    const { data, servicoId } = req.query;
    try {
      existeOuErro(data, "É necessario uma data para consulta.");
      existeOuErro(servicoId, "É necessario um servico para consulta.");

      const horarios = await this.agendaService.listarDisponibilidadeGeral(
        data,
        servicoId,
      );

      return res.json({
        data,
        horariosDisponiveis: horarios,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      const msg = error.statusCode ? error.message : "Erro interno inesperado.";
      if (status === 500) console.error("ERRO 500:", error);
      return res.status(status).send(msg);
    }
  };
}
