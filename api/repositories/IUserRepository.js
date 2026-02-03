// repositories/interfaces/IUserRepository.js

export class IUserRepository {
  constructor() {
    if (this.constructor === IUserRepository) {
      throw new Error(
        "IUserRepository é uma interface e não pode ser instanciada.",
      );
    }
  }

  async create(data) {
    throw new Error("Método não implementado");
  }

  async findAll(options) {
    throw new Error("Método não implementado");
  }

  async update(id, data) {
    throw new Error("Método não implementado");
  }

  async findByEmail(email) {
    throw new Error("Método não implementado");
  }

  async findById(id) {
    throw new Error("Método não implementado");
  }
  async delete(id) {
    throw new Error("Método não implementado");
  }
}
