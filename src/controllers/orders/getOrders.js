import { getUserOrders } from "../../services/getUserOrders.js";

export const getOrders = async (req, res, next) => {
  try {
    if (!req.user?._id) {
      return res
        .status(401)
        .json({
          message:
            "Authentication required. Please log in to view your orders.",
        });
    }

    const orders = await getUserOrders(req.user._id);

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
