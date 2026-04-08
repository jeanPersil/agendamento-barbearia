import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(80).required().messages({
    "string.min": "O nome deve ter pelo menos 3 caracteres",
    "string.max": "O nome não pode exceder 80 caracteres",
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
  }),

  email: Joi.string().email().max(100).required().messages({
    "string.email": "O campo email é inválido",
    "string.max": "O email não pode exceder 100 caracteres",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
  }),

  password: Joi.string().min(6).max(30).required().messages({
    "string.min": "A senha deve ter pelo menos 6 caracteres",
    "string.max": "A senha não pode exceder 30 caracteres",
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha é obrigatório",
  }),

  phone: Joi.string().min(10).max(20).required().messages({
    "string.min": "O telefone deve ter pelo menos 10 dígitos",
    "string.max": "O telefone não pode exceder 20 caracteres",
    "any.required": "O campo telefone é obrigatório",
    "string.empty": "O campo telefone é obrigatório",
  }),
});
