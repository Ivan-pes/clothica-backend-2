import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 32,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.password;
    return ret;
  },
});

export const UserModel = model("user", userSchema);
