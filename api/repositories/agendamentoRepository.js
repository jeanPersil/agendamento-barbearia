import { IBaseRepository } from "./interface/IBaseRepository.js";
import prisma from "../prisma.js";

export class AgendamentoRepository extends IBaseRepository {
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
        profissional: {
          select: { id: true, nome: true },
        },
        servico: true,
      },
    });
  }

  async findById(id) {
    return prisma.agendamento.findUnique({
      where: { id: id },
      include: {
        cliente: true,
        profissional: true,
        servico: true,
      },
    });
  }

  async update(id, data) {
    return prisma.agendamento.update({
      where: { id: id },
      data: data,
    });
  }

  async delete(id) {
    return prisma.agendamento.delete({
      where: { id: id },
    });
  }

  // --- MÉTODOS EXTRAS (ESPECÍFICOS DE AGENDAMENTO) ---
  async findByProfissional(profissionalId) {
    return prisma.agendamento.findMany({
      where: { profissionalId: profissionalId },
      include: { cliente: true, servico: true },
      orderBy: { dataHora: "asc" },
    });
  }

  async findByCliente(clienteId) {
    return prisma.agendamento.findMany({
      where: { clienteId: clienteId },
      include: { profissional: true, servico: true },
      orderBy: { dataHora: "desc" },
    });
  }

  async findConflitoHorario(profissionalId, dataHora) {
    return prisma.agendamento.findFirst({
      where: {
        profissionalId: profissionalId,
        dataHora: dataHora,
        status: {
          not: "CANCELADO",
        },
      },
    });
  }

  async findByIntervaloData(inicio, fim) {
    return prisma.agendamento.findMany({
      where: {
        dataHora: {
          gte: inicio,
          lte: fim,
        },
      },
      include: {
        cliente: true,
        profissional: true,
        servico: true,
      },
    });
  }

  async buscarSlotsLivres(profissionalId, listaDeHorarios) {
    return prisma.horario.findMany({
      where: {
        profissionalId: profissionalId,
        dataHora: { in: listaDeHorarios }, 
        disponivel: true, 
      },
    });
  }

  async ocuparSlots(idsDosSlots, agendamentoId) {
    return prisma.horario.updateMany({
      where: {
        id: { in: idsDosSlots }, 
      },
      data: {
        disponivel: false,
        agendamentoId: agendamentoId,
      },
    });
  }
}
