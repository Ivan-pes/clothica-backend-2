import { Router } from 'express';

import {auth as ctrl} from '../controllers/index.js';
import { authenticate } from '../middlewares/authenticate.js';

const authRouter = Router();

authRouter.post('/register', ctrl.registerUser);
authRouter.post('/login', ctrl.loginUser);
authRouter.post('/logout', authenticate, ctrl.logoutUser);

export default authRouter;
