class ValidationError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

class ForbiddenError extends Error {
  constructor(msg = "Você não tem permissão para realizar esta ação.") {
    super(msg);
    this.name = "ForbiddenError";
    this.statusCode = 403;
  }
}

function handleError(res, error) {
  if (error instanceof ValidationError || error instanceof ForbiddenError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.error(error);
  return res.status(500).json({ message: "Erro interno no servidor." });
}

export { ValidationError, ForbiddenError, handleError };
