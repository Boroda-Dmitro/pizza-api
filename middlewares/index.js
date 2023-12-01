import { isValidId } from "./isValidId.js";
import { validateBody } from "./validateBody.js";


const middlewares = {
  validateBody,
  isValidId
};

export default middlewares;
