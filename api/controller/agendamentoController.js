import { existeOuErro, igualOuErro } from "../validator.js";

export class AgendamentoController {
  constructor(agendamentoService) {
    this.agenService = agendamentoService;
  }

  criar = async (req, res) => {
    // codigo para criar um agendamento
  };
}
