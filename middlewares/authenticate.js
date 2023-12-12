import jwt from "jsonwebtoken";
import helpers from "../helpers/index.js";
import User from "../models/users.js";
import dotenv from "dotenv";
dotenv.config();

const { HttpError } = helpers;

const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");
    if (token && bearer !== "Bearer") {
        
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (err) {
    next(HttpError(401));
  }
};
