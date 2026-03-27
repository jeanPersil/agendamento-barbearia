import prisma from "../prisma.js";
import { IBaseRepository } from "./interface/IBaseRepository.js";

export class ServicosRepository extends IBaseRepository {
  async create(data) {
    return prisma.servico.create({ data });
  }

  async findAll(options = {}) {
    return prisma.servico.findMany(options);
  }

  async count(options = {}) {
    return prisma.servico.count(options);
  }

  async findById(id) {
    return prisma.servico.findUnique({ where: { id } });
  }

  async update(id, data) {
    return prisma.servico.update({ where: { id }, data });
  }

  async delete(id) {
    return prisma.servico.delete({ where: { id } });
  }

  async findOne(filtro) {
    return prisma.servico.findFirst({
      where: filtro,
    });
  }
}
