import prisma from "../prisma.js";
import { IBaseRepository } from "./interface/IBaseRepository.js";

export class AgendaRepository extends IBaseRepository {
  constructor() {
    super();
  }

  async create(data) {
    return prisma.horario.create({
      data: data,
    });
  }

  async findAll(options = {}) {
    return prisma.horario.findMany(options);
  }

  async findById(id) {
    return prisma.horario.findUnique({
      where: { id: id },
    });
  }

  async update(id, data) {
    return prisma.horario.update({
      where: { id: id },
      data: data,
    });
  }

  async delete(id) {
    return prisma.horario.delete({
      where: { id: id },
    });
  }

  async createMany(slots) {
    if (!slots || slots.length === 0) return { count: 0 };

    const profissionalId = slots[0].profissionalId;

    const datasParaSalvar = slots.map((slot) => slot.dataHora);

    const slotsExistentes = await prisma.horario.findMany({
      where: {
        profissionalId: profissionalId,
        dataHora: {
          in: datasParaSalvar,
        },
      },
      select: { dataHora: true },
    });

    const temposExistentes = new Set(
      slotsExistentes.map((slot) => new Date(slot.dataHora).getTime()),
    );

    const slotsNovos = slots.filter((slot) => {
      const tempoSlot = new Date(slot.dataHora).getTime();
      return !temposExistentes.has(tempoSlot);
    });

    if (slotsNovos.length > 0) {
      return prisma.horario.createMany({
        data: slotsNovos,
      });
    }

    return { count: 0 };
  }

  async findAllDisponiveisDoDia(inicioDia, fimDia) {
    return prisma.horario.findMany({
      where: {
        disponivel: true,
        dataHora: {
          gte: inicioDia,
          lte: fimDia,
        },
      },
      orderBy: { dataHora: "asc" },
    });
  }

  async findServicoById(id) {
    return prisma.servico.findUnique({
      where: { id: id },
    });
  }
}
