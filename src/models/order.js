import { Schema, model } from "mongoose";
import { SIZES } from "../constants/goods.js";

const orderSchema = new Schema(
  {
    items: [
      {
        good: { type: Schema.Types.ObjectId, ref: "good", required: true },
        size: { type: String, enum: SIZES, required: true },
        quantity: { type: Number, min: 1, required: true },
        price: { type: Number, min: 0, required: true },
      },
    ],
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    postOffice: { type: String, required: true, trim: true },
    comment: { type: String, trim: true, default: "" },
    number: { type: String, required: true, unique: true },
    total: { type: Number, min: 0, required: true },
    status: { type: String, default: "pending", required: true },
    user: { type: Schema.Types.ObjectId, ref: "user", default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OrderModel = model("order", orderSchema);
