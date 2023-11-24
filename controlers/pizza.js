import { pizzaModels } from "../models/pizza.js";
import helpers from "../helpers/index.js";

const { getPizzas, getPizzaByID, addNewPizza, editPizza, deletePizza } =
  pizzaModels;
const { HttpError, ctrlWrapper } = helpers;

const getAllPizzas = async (req, res) => {
  res.json(await getPizzas());
};

const getOnePizza = async (req, res) => {
  const result = await getPizzaByID(req.params.id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const newPizza = async (req, res) => {
  const result = await addNewPizza(req.body);
  res.status(201).json(result);
};

const updatePizza = async (req, res) => {
  const result = await editPizza(req.params.id, req.body);
  res.status(201).json(result);
};

const removePizza = async (req, res) => {
  const result = await deletePizza(req.params.id);
  if (!result) {
    throw HttpError(404, error.message);
  }
  res.status(204).json({ message: "Delete success" });
};

const ctrl = {
  getAllPizzas: ctrlWrapper(getAllPizzas),
  getOnePizza: ctrlWrapper(getOnePizza),
  newPizza: ctrlWrapper(newPizza),
  updatePizza: ctrlWrapper(updatePizza),
  removePizza: ctrlWrapper(removePizza),
};

export default ctrl;
