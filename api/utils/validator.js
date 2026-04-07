import { ValidationError } from "./errors.js";

function existeOuErro(valor, msg) {
  if (!valor) throw new ValidationError(msg);
  if (Array.isArray(valor) && valor.length === 0)
    throw new ValidationError(msg);
  if (typeof valor === "string" && !valor.trim())
    throw new ValidationError(msg);
}

function notExistOrError(valor, msg) {
  if (valor) throw new ValidationError(msg);
  if (Array.isArray(valor) && valor.length === 0)
    throw new ValidationError(msg);
  if (typeof valor === "string" && !valor.trim())
    throw new ValidationError(msg);
}

function igualOuErro(valor1, valor2, msg) {
  if (valor1 !== valor2) throw new ValidationError(msg);
}

export { existeOuErro, notExistOrError, igualOuErro };
