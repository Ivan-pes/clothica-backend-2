import { Router } from 'express';
import {subscriptions as ctrl} from '../controllers/index.js';
import { validateBody } from '../middlewares/validateBody.js';
import { subscriptionSchema } from '../validations/subscriptionsValidation.js';

const subscriptionsRouter = Router();

subscriptionsRouter.post(
  '/', 
  validateBody(subscriptionSchema), 
  ctrl.createSubscription
);
export default subscriptionsRouter;