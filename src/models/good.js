import { Schema, model } from "mongoose";
import { GENDERS, SIZES } from "../constants/goods.js";

const goodSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: "category", required: true },
    image: { type: String, required: true },
    price: {
      value: { type: Number, required: true, min: 0 },
      currency: { type: String, default: "грн" },
    },
    size: [{ type: String, enum: SIZES }],
    description: { type: String },
    prevDescription: { type: String },
    characteristics: [{ type: String }],
    gender: { type: String, enum: GENDERS, required: true },
    feedbacks: [{ type: Schema.Types.ObjectId, ref: "Feedback" }],
  },
  {
    versionKey: false,
  },
);

export const GoodModel = model("good", goodSchema);
