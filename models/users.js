import { Schema, model } from "mongoose";
import helpers from "../helpers/index.js";

const { handleMongooseError } = helpers;

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: { type: String, required: true, minlength: 6 },
    admin: { type: Boolean, default: false },
  },
  { versionKey: false }
);

usersSchema.post("save", handleMongooseError);

const User = model("user", usersSchema);

export default User;
