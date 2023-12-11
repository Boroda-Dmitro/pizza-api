import express from "express";
import ctrl from "../../controlers/users.js";
import middlewares from "../../middlewares/index.js";
import { userRegisterSchema, userLoginSchema } from "../../schemas/users.js";


const authRouter = express.Router();


authRouter.post(
  "/register",
  middlewares.validateBody(userRegisterSchema),
  ctrl.register
);

authRouter.post(
  "/login",
  middlewares.validateBody(userLoginSchema),
  ctrl.login
);


export default authRouter;
