import IBaseRepository from "../../interface/IBaseRepository.js";
import prisma from "../../prisma.js";

export class UserRepository extends IBaseRepository {
  async create(data) {
    return prisma.user.create({ data });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        skip: skip,
        take: limit,
        orderBy: { name: "asc" },
      }),
      prisma.user.count(),
    ]);

    return { users, total };
  }

  async findById(id) {
    return prisma.user.findUnique({ where: { id: Number(id) } });
  }

  async update(id, data) {
    return prisma.user.update({ where: { id: Number(id) }, data });
  }

  async delete(id) {
    return prisma.user.delete({ where: { id: Number(id) } });
  }

  async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email: email },
    });
  }
}
