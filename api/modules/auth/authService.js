import "dotenv/config";
import bcrypt from "bcrypt";
import { existeOuErro } from "../../utils/validator.js";
import { ValidationError } from "../../utils/errors.js";
import jwt from "jwt-simple";

const authSecret = process.env.secret_key;

export class AuthService {
  constructor(userRepository) {
    this.userRepo = userRepository;
  }

  async login(email, senha) {
    const user = await this.userRepo.findByEmail(email);

    existeOuErro(user, "Usuário ou senha incorretos");

    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!senhaCorreta) {
      throw new ValidationError("Usuario ou senha incorretos");
    }

    const now = Math.floor(Date.now() / 1000);

    const payload = {
      id: user.id,
      name: user.nome,
      email: user.email,
      role: user.role,
      iat: now,
      exp: now + 60 * 60 * 24 * 3,
    };

    return {
      ...payload,
      token: jwt.encode(payload, authSecret),
    };
  }
}
