import express from "express";
import { pizzaModels } from "../../models/pizza.js";
import helpers from "../../helpers/index.js";
import { pizzaSchema } from "../../schemas/pizza.js";


const { getPizzas, getPizzaByID, addNewPizza, editPizza, deletePizza } =
    pizzaModels;
  const { HttpError } = helpers;

const routerPizza = express.Router();

routerPizza.get("/", async (req, res, next) => {
  try {
    res.json(await getPizzas());
  } catch (error) {
    next(error);
  }
});

routerPizza.get("/:id", async (req, res, next) => {
  try {
    const result = await getPizzaByID(req.params.id);

    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

routerPizza.post("/", async (req, res, next) => {
    try {
        const { error } = pizzaSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message)
        }
        const result = await addNewPizza(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

routerPizza.put("/:id", async (req, res, next) => {
    try {
      const { error } = pizzaSchema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message);
      }
      const result = await editPizza(req.params.id, req.body);
      res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

routerPizza.delete("/:id", async (req, res, next) => {
    try {
        const result = await deletePizza(req.params.id);
        if (!result) {
            throw HttpError(404, error.message);
        } res.status(204).json({message: "Delete success"});
  } catch (error) {
    next(error);
  }
});

export default routerPizza;
