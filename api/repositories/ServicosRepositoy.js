import { IServicoRepository } from "./interface/IServicoRepository.js";
import prisma from "../prisma.js";

export class ServicosRepository extends IServicoRepository {
  async create(data) {
    return prisma.servico.create({
      data: data,
    });
  }

  async findAll(options = {}) {
    return prisma.servico.findMany(options);
  }

  async findOne(filtro) {
    return prisma.servico.findFirst({
      where: filtro,
    });
  }

  async update(id, data) {
    return prisma.servico.update({
      where: { id: id },
      data: data,
    });
  }

  async delete(id) {
    return prisma.servico.delete({
      where: { id: id },
    });
  }
}
