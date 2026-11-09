import { Router } from 'express';
import { celebrate } from 'celebrate';

import {users as ctrl} from '../controllers/index.js';
import { authenticate } from '../middlewares/authenticate.js';
import { updateCurrentUserSchema } from '../validations/usersValidation.js';

const usersRouter = Router();

usersRouter.get('/current', authenticate, ctrl.getCurrentUser);
usersRouter.patch('/current', authenticate, celebrate(updateCurrentUserSchema), ctrl.updateCurrentUser);

export default usersRouter;
