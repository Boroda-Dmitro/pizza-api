import Pizza from "../models/pizza.js";
import helpers from "../helpers/index.js";

const { HttpError, ctrlWrapper } = helpers;

const getAllPizzas = async (req, res) => {
  const result = await Pizza.find();
  res.json(result);
};

const getOnePizza = async (req, res) => {
  const { id } = req.params;
  const result = await Pizza.findById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const newPizza = async (req, res) => {
  const result = await Pizza.create(req.body);
  res.status(201).json(result);
};

const updatePizza = async (req, res) => {
  const { id } = req.params;
  const result = await Pizza.findByIdAndUpdate(id, req.body, { new: true });
  res.status(201).json(result);
};

const removePizza = async (req, res) => {
  const { id } = req.params;
  const result = await Pizza.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, error.message);
  }
  res.status(204).json("Delete success");
};

const ctrl = {
  getAllPizzas: ctrlWrapper(getAllPizzas),
  getOnePizza: ctrlWrapper(getOnePizza),
  newPizza: ctrlWrapper(newPizza),
  updatePizza: ctrlWrapper(updatePizza),
  removePizza: ctrlWrapper(removePizza),
};

export default ctrl;
