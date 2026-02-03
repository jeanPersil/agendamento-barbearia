export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create({
      data: data,
    });
  }

  async findAll(options = {}) {
    return this.model.findMany(options);
  }

  async findById(id) {
    return this.model.findUnique({
      where: { id: id },
    });
  }

  async update(id, data) {
    return this.model.update({
      where: { id: id },
      data: data,
    });
  }

  async delete(id) {
    return this.model.delete({
      where: { id: id },
    });
  }
}
