export class ReturnUserDTO {
  
  constructor(user) {
    this.id = user.id;
    this.name = user.nome;
    this.email = user.email;
    this.phone = user.telefone
  }

}
