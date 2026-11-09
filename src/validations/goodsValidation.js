import { Joi, Segments } from "celebrate";
import { GENDERS, SIZES } from "../constants/goods.js";

const sizesPattern = new RegExp(
  `^(${SIZES.join("|")})(,(${SIZES.join("|")}))*$`,
);

export const getGoodsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(24).default(12),
    category: Joi.string().hex().length(24),
    size: Joi.string()
      .pattern(sizesPattern)
      .messages({
        "string.pattern.base": `"size" must be a comma-separated list of: ${SIZES.join(", ")}`,
      }),
    minPrice: Joi.number().min(0),
    maxPrice: Joi.number().min(Joi.ref("minPrice", { adjust: (v) => v ?? 0 })),
    gender: Joi.string().valid(...GENDERS),
  }),
};
