import { Router } from 'express';
import { celebrate } from 'celebrate';

import { auth as ctrl } from '../controllers/index.js';
import { authenticate } from '../middlewares/authenticate.js';
import { registerUserSchema } from '../validations/usersValidation.js';

const authRouter = Router();

authRouter.post(
  '/register',
  celebrate(registerUserSchema),
  ctrl.registerUser,
);

authRouter.post('/login', ctrl.loginUser);

authRouter.post('/logout', authenticate, ctrl.logoutUser);

export default authRouter;
