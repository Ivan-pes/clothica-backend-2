import {GoodModel} from "../../models/good.js";
import createHttpError from "http-errors";

export const getGoodById = async (req, res) => {
    const {goodId} = req.params;
    console.log('goodId', goodId);
    const good = await GoodModel.findById(goodId);
    if(!good) {
     throw createHttpError(404, `Good with id ${goodId} not found`);
    }
    
   return res.json(good);
};
