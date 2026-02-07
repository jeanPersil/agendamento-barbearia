import { existeOuErro } from "../validator.js";

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  login = async (req, res) => {
    const { email, senha } = req.body;

    try {
      existeOuErro(email, "O campo email é obrigatorio");
      existeOuErro(senha, "O campo senha é obrigatorio");

      const resultado = await this.authService.login(email, senha);

      res.cookie("token", resultado.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 3, // 3 dias (mesmo tempo do token)
      });

      return res.status(200).json({
        user: {
          id: resultado.id,
          name: resultado.name,
          email: resultado.email,
          role: resultado.role,
        },
      });
    } catch (error) {
      const status = error.statusCode || 500;
      const msg = error.statusCode ? error.message : "Erro interno inesperado.";
      if (status === 500) console.error("ERRO 500:", error);
      return res.status(status).send(msg);
    }
  };


  
}
