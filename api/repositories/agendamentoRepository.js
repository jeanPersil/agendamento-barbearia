import { IBaseRepository } from "./interface/IBaseRepository.js";
import prisma from "../prisma.js";

export class AgendamentoRepository extends IBaseRepository {
  // --- MÉTODOS PADRÃO (CRUD) ---
  async create(data) {
    return prisma.agendamento.create({
      data: data,
    });
  }

  async findAll(options = {}) {
    return prisma.agendamento.findMany({
      ...options,
      include: {
        cliente: {
          select: { id: true, nome: true, email: true, telefone: true },
        },
        profissional: { select: { id: true, nome: true } },
        servico: true,
      },
    });
  }

  async findById(id) {
    return prisma.agendamento.findUnique({
      where: { id: id },
      include: { cliente: true, profissional: true, servico: true },
    });
  }

  async update(id, data) {
    return prisma.agendamento.update({ where: { id: id }, data: data });
  }

  async delete(id) {
    return prisma.agendamento.delete({ where: { id: id } });
  }

  async findDisponibilidade(profissionalId, diaSemana) {
    return prisma.disponibilidade.findFirst({
      where: {
        profissionalId: profissionalId,
        diaSemana: diaSemana,
      },
    });
  }

  async findAgendamentosPorIntervalo(profissionalId, inicio, fim) {
    return prisma.agendamento.findMany({
      where: {
        profissionalId,
        data: {
          gte: inicio,
          lte: fim,
        },
      },
      select: { horario: true, servico: { select: { duracaoMin: true } } },
    });
  }

  async findServicoById(id) {
    return prisma.servico.findUnique({
      where: { id: id },
    });
  }

  async findAgendamentosDoDia(profissionalId, dataObjeto) {
    return prisma.agendamento.findMany({
      where: {
        profissionalId,
        data: dataObjeto,
      },
      include: { servico: true },
    });
  }
}
