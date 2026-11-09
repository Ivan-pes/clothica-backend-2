import {GoodModel} from "../../models/good.js";

export const getGoods = async (req, res) => {
    const{page = 1, perPage = 12, category, size, price, minPrice, maxPrice, gender} = req.query;

    const limit = [8,12].includes(Number(perPage)) ? Number(perPage) : 12;
    const skip = (Number(page) - 1) * limit;
  const goodsQuery = GoodModel.find();

if(category) {
    goodsQuery.where('category').equals(category);
}
if(size) {
    goodsQuery.where('size').equals(size);
}
if(price) {
    goodsQuery.where('price.value').gte(Number(price));
} else {
    if(minPrice) {
        goodsQuery.where('price.value').gte(Number(minPrice));
    }
    if(maxPrice) {
        goodsQuery.where('price.value').lte(Number(maxPrice));
    }
}

if(gender) {
    goodsQuery.where('gender').equals(gender);
}

const [totalItems, goods] = await Promise.all([
    goodsQuery.clone().countDocuments(),
    goodsQuery.skip(skip).limit(limit)
]);
const totalPages = Math.ceil(totalItems / limit);
    res.status(200).json({ 
        page: Number(page), 
        perPage: limit, 
        totalItems,
        totalPages, 
        goods,  });
}
