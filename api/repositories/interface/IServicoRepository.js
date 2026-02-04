export class IServicoRepository {
  constructor() {
    if (this.constructor === IServicoRepository) {
      throw new Error(
        "IServicoRepository é uma interface e não pode ser instanciada.",
      );
    }
  }

  async create(data) {
    throw new Error("Método não implementado");
  }

  async findOne(filtro) {
    throw new Error("Método não implementado");
  }

  async findAll(options) {
    throw new Error("Método não implementado");
  }

  async update(id, data) {
    throw new Error("Método não implementado");
  }

  async delete(id) {
    throw new Error("Método não implementado");
  }
}
