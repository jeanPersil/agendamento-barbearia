import { existeOuErro } from "../utils/validator.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  login = asyncHandler(async (req, res) => {
    const { email, senha } = req.body;

    existeOuErro(email, "O campo email é obrigatório");
    existeOuErro(senha, "O campo senha é obrigatório");

    const resultado = await this.authService.login(email, senha);

    if (!resultado) {
      throw new ValidationError("Email ou senha inválidos");
    }

    res.cookie("token", resultado.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });

    return res.status(200).json({
      user: {
        id: resultado.id,
        name: resultado.name,
        email: resultado.email,
        role: resultado.role,
      },
    });
  });
}
