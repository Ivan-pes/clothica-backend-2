import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const goodSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    gender: {
      type: String,
      enum: ["men", "women", "unisex"],
      required: true,
    },
    sizes: [String],
    images: [String],
  },
  { timestamps: true },
);

export const GoodModel = models.Good || model("Good", goodSchema);
