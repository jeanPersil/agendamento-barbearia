import prisma from "../prisma.js";
import { IBaseRepository } from "./interface/IBaseRepository.js";

export class UserRepository extends IBaseRepository {
  async create(data) {
    return prisma.user.create({ data });
  }

  async findAll(options = {}) {
    return prisma.user.findMany(options);
  }

  async count(options = {}) {
    return prisma.user.count(options);
  }

  async findById(id) {
    return prisma.user.findUnique({ where: { id } });
  }

  async update(id, data) {
    return prisma.user.update({ where: { id }, data });
  }

  async delete(id) {
    return prisma.user.delete({ where: { id } });
  }

  async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email: email },
    });
  }

  async findByRole(role) {
    return prisma.user.findMany({
      where: { role: role },
    });
  }
}
