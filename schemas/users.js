import Joi from "joi";

export const userRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required(),
  password: Joi.string().min(6).required(),
  
});

export const userLoginSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required(),
  password: Joi.string().min(6).required(),
});
