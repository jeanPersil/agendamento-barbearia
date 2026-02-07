import "dotenv/config";
import bcrypt from "bcrypt";
import { existeOuErro } from "../validator.js";
import jwt from "jwt-simple"; // 1. Importação nomeada correta

// Dica: Garanta que o nome no .env seja exatamente igual (ex: JWT_SECRET)
const authSecret = process.env.secret_key;

export class AuthService {
  constructor(userRepository) {
    this.userRepo = userRepository;
  }

  async login(email, senha) {
    const user = await this.userRepo.findByEmail(email);

    existeOuErro(user, "Usuário não encontrado");

    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!senhaCorreta) {
      throw "Senha incorreta";
    }

    const now = Math.floor(Date.now() / 1000);

    const payload = {
      id: user.id,
      name: user.nome,
      email: user.email,
      role: user.role,
      iat: now,
      exp: now + 60 * 60 * 24 * 3, // 3 dias
    };

    return {
      ...payload,
      token: jwt.encode(payload, authSecret),
    };
  }
}
