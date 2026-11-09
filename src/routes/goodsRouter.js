import { Router } from "express";
import { celebrate } from "celebrate";

import { goods as ctrl } from "../controllers/index.js";
import { getGoodsSchema } from "../validations/goodsValidation.js";

const goodsRouter = Router();

goodsRouter.get("/", celebrate(getGoodsSchema), ctrl.getGoods);
goodsRouter.get("/:goodId", ctrl.getGoodById);

export default goodsRouter;
