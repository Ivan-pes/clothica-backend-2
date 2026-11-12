import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import { GoodModel } from "../../models/good.js";
import { OrderModel } from "../../models/order.js";
import { Session } from "../../models/session.js";

const findSession = (req) => {
  const { accessToken, sessionId } = req.cookies ?? {};
  if (accessToken) {
    if (!isValidObjectId(sessionId)) return null;
    return Session.findOne({ _id: sessionId, accessToken });
  }
  const [type, token] = req.headers.authorization?.split(" ") ?? [];
  if (type !== "Bearer" || !token) return null;
  return Session.findOne({ accessToken: token });
};

const getUserIdFromSession = async (req) => {
  const session = await findSession(req);
  if (!session || session.accessTokenValidUntil <= new Date()) return null;
  return session.userId;
};

export const createOrder = async (req, res, next) => {
  try {
    const { items, firstName, lastName, phone, city, postOffice, comment } =
      req.body;

    const userId = await getUserIdFromSession(req);

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
        throw createHttpError(
          400,
          `Розмір ${size} недоступний для товару ${goodId}`,
        );
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
      user: userId,
    });

    order.number = order._id.toString();
    await order.save();

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};
