import bcrypt from "bcrypt";

export class UserEntity {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.password = data.password;
    this.role = data.role !== undefined ? data.role : 0;
  }

  isAdmin() {
    return this.role === 1;
  }

  async checkPassword(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  }

  
}
