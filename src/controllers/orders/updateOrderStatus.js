import createHttpError from 'http-errors';
import { OrderModel } from '../../models/order.js';

export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await OrderModel.findByIdAndUpdate(
    orderId,
    { status },
    { returnDocument: 'after', runValidators: true },
  );

  if (!order) {
    throw createHttpError(404, `Order with id ${orderId} not found`);
  }

  res.status(200).json(order);
};
