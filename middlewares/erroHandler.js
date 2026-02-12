function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;

  if (status === 500) {
    console.error("ERRO 500:", err);
  }

  res.status(status).json({
    error: err.name || "InternalError",
    message: err.message || "Erro interno inesperado.",
  });
}

export default errorHandler;
