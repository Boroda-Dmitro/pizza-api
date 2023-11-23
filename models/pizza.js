import { fileURLToPath } from "url";
import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";
import { log } from "console";

const pizzaPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../pizza.json"
);

const getPizzas = async () => {
  const data = await fs.readFile(pizzaPath);
  return JSON.parse(data);
};
const getPizzaByID = async (id) => {
  const pizza = await getPizzas();
  return pizza.find((item) => item.id === id) || null;
};

const addNewPizza = async ({ name, ingredients, image, price, discount }) => {
  const pizza = await getPizzas();
  const newPizza = { id: nanoid(), name, ingredients, image, price, discount };
  pizza.push(newPizza);
  await fs.writeFile(pizzaPath, JSON.stringify(pizza, null, 2));
  return newPizza;
};

const editPizza = async (id, data) => {
  const pizza = await getPizzas();

  const index = pizza.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  pizza[index] = { id, ...data };
  await fs.writeFile(pizzaPath, JSON.stringify(pizza, null, 2));
  return pizza[index];
};

const deletePizza = async (id) => {
  const pizza = await getPizzas();
  const index = pizza.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = pizza.splice(index, 1);
  await fs.writeFile(pizzaPath, JSON.stringify(pizza, null, 2));
  return result;
};

export const pizzaModels = {
  getPizzas,
  getPizzaByID,
  addNewPizza,
  editPizza,
  deletePizza,
};
