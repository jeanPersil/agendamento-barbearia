import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
  }),

  email: Joi.string().email().required().messages({
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
    "string.email": "O campo email é inválido",
  }),

  password: Joi.string().required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha é obrigatório",
  }),

  phone: Joi.string().required().messages({
    "any.required": "O campo telefone é obrigatório",
    "string.empty": "O campo telefone é obrigatório",
  }),
});
