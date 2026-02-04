// repositories/interfaces/IUserRepository.js

export class IUserRepository {
  constructor() {
    if (this.constructor === IUserRepository) {
      throw new Error(
        "IUserRepository é uma interface e não pode ser instanciada.",
      );
    }
  }

  create = async (data) => {
    throw new Error("Método não implementado");
  };

  findAll = async (options) => {
    throw new Error("Método não implementado");
  };

  update = async (id, data) => {
    throw new Error("Método não implementado");
  };

  findByEmail = async (email) => {
    throw new Error("Método não implementado");
  };

  findById = async (id) => {
    throw new Error("Método não implementado");
  };

  delete = async (id) => {
    throw new Error("Método não implementado");
  };
}
