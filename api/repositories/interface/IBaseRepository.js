export class IBaseRepository {
  constructor() {
    if (this.constructor === IBaseRepository) {
      throw new Error(
        "IBaseRepository é uma classe abstrata e não pode ser instanciada.",
      );
    }
  }

  async create(data) {
    throw new Error("Método create não implementado");
  }

  async findAll(options) {
    throw new Error("Método findAll não implementado");
  }

  async findById(id) {
    throw new Error("Método findById não implementado");
  }

  async update(id, data) {
    throw new Error("Método update não implementado");
  }

  async delete(id) {
    throw new Error("Método delete não implementado");
  }
}
