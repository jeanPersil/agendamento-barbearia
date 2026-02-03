import { BaseRepository } from "./baseRepository.js";
import  prisma  from "../prisma.js";

export class UserRepository extends BaseRepository {
  constructor() {
    super(prisma.user);
  }

  async findByEmail(email) {
    return this.model.findUnique({
      where: { email },
    });
  }
}
