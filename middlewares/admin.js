export function verificarAdmin(req, res, next) {
  const user = req.user;

  if (!user || user.role !== "ADMIN") {
    return res
      .status(403)
      .send("Acesso negado: Requer privilégios de administrador.");
  }

  next();
}
