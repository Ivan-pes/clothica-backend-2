import { Router } from "express";

import { auth as ctrl } from "../controllers/index.js";
import { authenticate } from "../middlewares/authenticate.js";
import { celebrate } from "celebrate";
import {
  loginUserSchema,
  registerUserSchema,
} from "../validations/authValidation.js";

const authRouter = Router();

authRouter.post("/register", celebrate(registerUserSchema), ctrl.registerUser);
authRouter.post("/login", celebrate(loginUserSchema), ctrl.loginUser);
authRouter.post("/logout", authenticate, ctrl.logoutUser);

export default authRouter;
