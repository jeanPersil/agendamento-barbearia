export class AgendaService {
  constructor(agendaRepo, userRepo) {
    this.agendaRepo = agendaRepo;
    this.userRepo = userRepo;
  }

  // CONFIGURAÇÃO DAS FICHAS
  config = {
    horaInicio: 8, 
    totalFichas: 20, 
    tamanhoFichaMin: 30,
  };

  // ---------------------------------------------------------
  // 1. GERADOR DE AGENDA (Baseado em Fichas)
  // ---------------------------------------------------------
  async gerarAgendaFutura() {
    console.log(" Gerando agenda ");

    const profissionais = await this.userRepo.findAll({
      where: {
        role: "PROFISSIONAL",
      },
    });
    const hoje = new Date();
    const diasParaGerar = 30;

    for (const prof of profissionais) {
      const slotsParaSalvar = [];

      for (let d = 0; d < diasParaGerar; d++) {
        const dataBase = new Date(hoje);
        dataBase.setDate(hoje.getDate() + d);

        const diaSemana = dataBase.getDay();
        if (diaSemana === 0 || diaSemana === 1) continue;

        let horaAtual = new Date(dataBase);
        horaAtual.setHours(this.config.horaInicio, 0, 0, 0);

        for (let ficha = 0; ficha < this.config.totalFichas; ficha++) {
          if (ficha === 8 || ficha === 9) {
            horaAtual.setMinutes(
              horaAtual.getMinutes() + this.config.tamanhoFichaMin,
            );
            continue;
          }

          slotsParaSalvar.push({
            profissionalId: prof.id,
            dataHora: new Date(horaAtual),
            disponivel: true,
          });

          horaAtual.setMinutes(
            horaAtual.getMinutes() + this.config.tamanhoFichaMin,
          );
        }
      }

      if (slotsParaSalvar.length > 0) {
        await this.agendaRepo.createMany(slotsParaSalvar);
      }
    }

    return { message: "Agenda atualizada com sucesso." };
  }

  async listarDisponibilidade(profissionalId, dataStr,   servicoId) {

    const servico = await this.agendaRepo.findServicoById(servicoId);
    if (!servico) throw new Error("Serviço não encontrado");

    const fichasNecessarias = Math.ceil(
      servico.duracaoMin / this.config.tamanhoFichaMin,
    );

    const inicioDia = new Date(dataStr);
    inicioDia.setUTCHours(0, 0, 0, 0);
    const fimDia = new Date(dataStr);
    fimDia.setUTCHours(23, 59, 59, 999);

    const slotsLivres = await this.agendaRepo.findDisponiveisDoDia(
      profissionalId,
      inicioDia,
      fimDia,
    );

    const horariosValidos = [];

    const mapaSlots = new Map(
      slotsLivres.map((s) => [new Date(s.dataHora).getTime(), s]),
    );

    for (const slot of slotsLivres) {
      let cabeOServico = true;

      for (let i = 0; i < fichasNecessarias; i++) {
        const horaCheck = new Date(slot.dataHora);
        horaCheck.setMinutes(
          horaCheck.getMinutes() + i * this.config.tamanhoFichaMin,
        );

        if (!mapaSlots.has(horaCheck.getTime())) {
          cabeOServico = false;
          break;
        }
      }

      if (cabeOServico) {
        const horaFormatada = slot.dataHora
          .toISOString()
          .split("T")[1]
          .slice(0, 5); // Ex: "14:00"
        horariosValidos.push(horaFormatada);
      }
    }

    return horariosValidos;
  }
}
