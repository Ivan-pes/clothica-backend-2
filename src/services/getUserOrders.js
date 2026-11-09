import { OrderModel } from "../models/order.js";

export const getUserOrders = async (userId) => {
  return OrderModel.find({ user: userId });
};
