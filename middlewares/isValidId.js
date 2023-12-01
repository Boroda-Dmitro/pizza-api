import { isValidObjectId } from "mongoose";
import helpers from "../helpers/index.js";
const { HttpError } = helpers;

export const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid id`));
  }
  next();
};
