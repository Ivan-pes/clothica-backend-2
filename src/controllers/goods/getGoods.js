import {GoodModel} from "../../models/good.js";

export const getGoods = async (req, res, next) => {
   try {const goods = await GoodModel.find();
    res.status(200).json(goods);
} catch (error) {next(error)}};
