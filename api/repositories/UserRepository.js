import prisma from "../prisma.js"; // Ajuste o caminho do seu prisma
import { IBaseRepository } from "./interface/IBaseRepository.js";

export class UserRepository extends IBaseRepository {
  // --- MÉTODOS DO CONTRATO (OBRIGATÓRIOS) ---

  async create(data) {
    return prisma.user.create({ data });
  }

  async findAll(options = {}) {
    return prisma.user.findMany(options);
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

  // --- MÉTODOS EXTRAS (ESPECÍFICOS DESTA CLASSE) ---

  async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email: email },
    });
  }

  async findByRole(role) {
    return prisma.user.findMany({
      where: { role: role }, // Ex: busca só quem é 'PROFISSIONAL'
    });
  }
}
