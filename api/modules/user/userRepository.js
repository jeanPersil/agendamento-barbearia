import IBaseRepository from "../../interface/IBaseRepository.js";
import prisma from "../../prisma.js";

export class UserRepository extends IBaseRepository {
  async create(data) {
    return prisma.usuario.create({ data });
  }

  async findAll(options = {}) {
    return prisma.usuario.findMany(options);
  }

  async findById(id) {
    return prisma.usuario.findUnique({ where: { id } });
  }

  async update(id, data) {
    return prisma.usuario.update({ where: { id }, data });
  }

  async delete(id) {
    return prisma.usuario.delete({ where: { id } });
  }

  async findByEmail(email) {
    return prisma.usuario.findUnique({
      where: { email: email },
    });
  }
}
