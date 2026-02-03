// repositories/implementations/UserRepository.js

import prisma from "../prisma.js";
import { IUserRepository } from "../repositories/IUserRepository.js";

export class UserRepository extends IUserRepository {
  async create(data) {
    return prisma.user.create({
      data: data,
    });
  }

  async findAll(options = {}) {
    return prisma.user.findMany(options);
  }

  async update(id, data) {
    return prisma.user.update({
      where: { id: id },
      data: data,
    });
  }

  async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email: email },
    });
  }

  async findById(id) {
    return prisma.user.findUnique({
      where: { id: id },
    });
  }

  async delete(id) {
    return prisma.user.delete({
      where: { id: id },
    });
  }
}
