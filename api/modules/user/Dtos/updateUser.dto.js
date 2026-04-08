import Joi from "joi";

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(80).optional().messages({
    "string.min": "O nome deve ter pelo menos 3 caracteres",
    "string.max": "O nome não pode exceder 80 caracteres",
  }),

  email: Joi.string().email().max(100).optional().messages({
    "string.email": "O campo email é inválido",
    "string.max": "O email não pode exceder 100 caracteres",
  }),

  password: Joi.string().min(6).max(30).optional().messages({
    "string.min": "A nova senha deve ter pelo menos 6 caracteres",
    "string.max": "A senha não pode exceder 30 caracteres",
  }),

  phone: Joi.string().min(10).max(20).optional().messages({
    "string.min": "O telefone deve ter pelo menos 10 dígitos",
    "string.max": "O telefone não pode exceder 20 caracteres",
  }),
})
  .min(1)
  .messages({
    "object.min": "Você deve informar pelo menos um campo para atualizar.",
  });
