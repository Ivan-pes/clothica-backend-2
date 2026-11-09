import createHttpError from 'http-errors';
import { GoodModel } from '../../models/good.js';
import { OrderModel } from '../../models/order.js';

export const createOrder = async (req, res, next) => {
  try {
    const { items, firstName, lastName, phone, city, postOffice, comment } =
      req.body;
    const goods = await GoodModel.find({
      _id: { $in: items.map(({ good }) => good) },
    });
    const goodsById = new Map(goods.map((good) => [good.id, good]));

    const orderItems = items.map(({ good: goodId, size, quantity }) => {
      const good = goodsById.get(goodId);

      if (!good) {
        throw createHttpError(404, `Товар ${goodId} не знайдено`);
      }

      if (!good.size.includes(size)) {
        throw createHttpError(400, `Розмір ${size} недоступний для товару ${goodId}`);
      }

      return { good: good._id, size, quantity, price: good.price.value };
    });
    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = new OrderModel({
      items: orderItems,
      firstName,
      lastName,
      phone,
      city,
      postOffice,
      comment,
      total,
    });
    order.number = order._id.toString();
    await order.save();

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};
