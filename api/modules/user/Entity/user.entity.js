export class UserEntity {
  constructor(data) {
    this.id = data.id; 
    this.nome = data.name;
    this.email = data.email;
    this.telefone = data.phone;
    this.senha = data.password;
    this.role = data.role !== undefined ? data.role : 0;
  }

  isAdmin() {
    return this.role === 1;
  }
}
