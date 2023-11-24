import express from "express";
import ctrl from "../../controlers/pizza.js";
import middlewares from "../../middlewares/index.js";
import { pizzaSchema } from "../../schemas/pizza.js";

const routerPizza = express.Router();

routerPizza.get("/", ctrl.getAllPizzas);

routerPizza.get("/:id", ctrl.getOnePizza);

routerPizza.post("/", middlewares.validateBody(pizzaSchema), ctrl.newPizza);

routerPizza.put(
  "/:id",
  middlewares.validateBody(pizzaSchema),
  ctrl.updatePizza
);

routerPizza.delete("/:id", ctrl.removePizza);

export default routerPizza;
