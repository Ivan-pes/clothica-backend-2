import mongoose from "mongoose";
import createHttpError from "http-errors";
import { GoodModel } from "../../models/good.js";

export const getGoods = async (req, res, next) => {
  try {
    const {
      category,
      gender,
      size,
      minPrice,
      maxPrice,
      page = 1,
      limit,
      device = "desktop",
    } = req.query;

    // 1. Валідація некоректних параметрів (числові значення)
    const parsedPage = Number(page);
    if (isNaN(parsedPage) || parsedPage < 1) {
      return next(
        createHttpError(
          400,
          'Некоректне значення параметра "page". Воно має бути додатним числом.',
        ),
      );
    }

    let parsedLimit;
    if (limit) {
      parsedLimit = Number(limit);
      if (isNaN(parsedLimit) || parsedLimit < 1) {
        return next(
          createHttpError(
            400,
            'Некоректне значення параметра "limit". Воно має бути додатним числом.',
          ),
        );
      }
    } else {
      // За ТЗ: 8 товарів для мобілки/планшета, 12 для десктопу
      parsedLimit = device === "mobile" || device === "tablet" ? 8 : 12;
    }

    if (minPrice && isNaN(Number(minPrice))) {
      return next(createHttpError(400, 'Некоректний параметр "minPrice"'));
    }

    if (maxPrice && isNaN(Number(maxPrice))) {
      return next(createHttpError(400, 'Некоректний параметр "maxPrice"'));
    }

    // 2. Формування фільтра
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (gender) {
      filter.gender = gender;
    }

    if (size) {
      filter.sizes = size;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // 3. Розрахунок пропуску товарів для пагінації
    const skip = (parsedPage - 1) * parsedLimit;

    // 4. Запит до бази даних
    const [goods, totalGoods] = await Promise.all([
      GoodModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parsedLimit),
      GoodModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalGoods / parsedLimit);

    res.status(200).json({
      success: true,
      totalGoods,
      totalPages,
      currentPage: parsedPage,
      limit: parsedLimit,
      data: goods,
    });
  } catch (error) {
    next(error);
  }
};
