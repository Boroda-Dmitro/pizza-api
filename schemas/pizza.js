import Joi from "joi";

export const pizzaSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.array().items(Joi.string()).required(),
  image: Joi.string().required(),
  price: Joi.string().pattern(/^\d+$/).required(),
  discount: Joi.boolean().required(),
});

