import { existeOuErro, igualOuErro } from "../validator.js"
import {UserService} from "../service/userService.js"

const userService = new UserService()   

class UserController {
  salvarUser = (req, res) => {

  const {nome, email, senha, confirmarSenha, telefone, admin = false, role = "cliente", userId} = req.body

    try {
      existeOuErro(nome, "O campo nome é obrigatorio")
      existeOuErro(email,"O campo email é obrigatorio")
      existeOuErro(senha,"O campo senha é obrigatorio")
      igualOuErro(senha, confirmarSenha, "As senhas não conferem")
      existeOuErro(telefone, "O campo telefone é obrigatorio")
    } catch (msg) {
      return res.status(400).send(msg)
    }
    if( userId ){
      userService.editar(userId, nome, email, senha, telefone, admin, role).then((user) => {
        return res.status(200).send(user)
      }).catch((msg) => {
        return res.status(500).send(msg)
      })
    } else {
      userService.criarUser(nome, email, senha, telefone, admin, role).then((_) => {
        console.log("usuario criado com sucesso");
        return res.status(201).send()
      }).catch((error) => {
         console.error(" ERRO REAL:", error.message);
  console.error(" DETALHES:", JSON.stringify(error, null, 2));
        return res.status(500).send(error)
      })
    }
  }

  login = (req, res) => {

  }

  logout = (req, res) => {
  
  
  }

}

export { UserController}