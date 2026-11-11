import { Router } from 'express';

import {orders as ctrl} from '../controllers/index.js';
import { authenticate } from '../middlewares/authenticate.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';
import { celebrate } from 'celebrate';
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from '../validations/orderValidation.js';

const ordersRouter = Router();

ordersRouter.post('/', celebrate(createOrderSchema), ctrl.createOrder);
ordersRouter.get('/', authenticate, ctrl.getOrders);
ordersRouter.patch(
  '/:orderId/status',
  authenticate,
  requireAdmin,
  celebrate(updateOrderStatusSchema),
  ctrl.updateOrderStatus,
);

export default ordersRouter;
