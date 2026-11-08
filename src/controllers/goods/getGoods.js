import { GoodModel } from "../../models/good.js";

export const getGoods = async (req, res, next) => {
  try {
    const { page, perPage, category, size, minPrice, maxPrice, gender } =
      req.query;
    const skip = (page - 1) * perPage;

    const filter = {};
    if (category) filter.category = category;
    if (size) filter.size = { $in: size.split(",") };
    if (gender) filter.gender = gender;
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter["price.value"] = {};
      if (minPrice !== undefined) filter["price.value"].$gte = minPrice;
      if (maxPrice !== undefined) filter["price.value"].$lte = maxPrice;
    }

    const goodsQuery = GoodModel.find(filter);
    const [totalItems, goods] = await Promise.all([
      goodsQuery.clone().countDocuments(),
      goodsQuery.sort({ _id: -1 }).skip(skip).limit(perPage),
    ]);

    const totalPages = Math.ceil(totalItems / perPage);

    res.status(200).json({ page, perPage, totalItems, totalPages, goods });
  } catch (error) {
    next(error);
  }
};
