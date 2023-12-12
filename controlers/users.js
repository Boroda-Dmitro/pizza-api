import User from "../models/users.js";
import helpers from "../helpers/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { SECRET_KEY } = process.env;

const { HttpError, ctrlWrapper } = helpers;

const register = async (req, res) => {
  const { email, password, name } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
    admin: newUser.admin,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    token,
    user: { email: user.email, name: user.name, admin: user.admin },
  });
};

const getCurrentUser = async (req, res) => {
  const { name, email } = req.user;

  res.json({ name, email });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });
console.log(_id);
  res.json({ message: "Logout success" });
};

const ctrl = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logout: ctrlWrapper(logout),
};

export default ctrl;
