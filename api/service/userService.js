import prisma from "../prisma.js";


class UserService {
 async criarUser(nome, email, senha, telefone, admin, role) {
    const data = {
        nome,
        email,
        senha, 
        telefone,
        admin,
    };

   
    if (role === 'CLIENTE') {
        data.cliente = {
            create: {} 
        };
    } else if (role === 'PROFISSIONAL') {
        data.profissional = {
            create: {}
        };
    }
    // O Prisma cria o User E o Cliente/Profissional numa única transação
    return prisma.user.create({
        data: data
    });
}

  async editar (id, nome, email, senha, telefone, admin, role){
 
  }

  async banir (){
    // logica para deletar banir um usuario
  }

  async login(email, senha){

  }

  async logout(){
    
  }
}

export { UserService}