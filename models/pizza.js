import { Schema, model } from "mongoose";
import helpers from "../helpers/index.js";

const { handleMongooseError } = helpers;

const pizzaSchema = new Schema(
  {
    name: { type: String, required: true },
    ingredients: { type: Array, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    discount: { type: Boolean, default: false },
    type: { type: String, enum: ["pizza", "sushi", "burger"], required: true },
  },
  { versionKey: false }
);

pizzaSchema.post("save", handleMongooseError);

const Pizza = model("pizza", pizzaSchema);

export default Pizza;
