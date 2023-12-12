import { authenticate } from "./authenticate.js";
import { isValidId } from "./isValidId.js";
import { validateBody } from "./validateBody.js";

const middlewares = {
  validateBody,
  isValidId,
  authenticate,
};

export default middlewares;
