import { Schema, model } from "mongoose";
const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

export const OrderModel = model("order", orderSchema);
