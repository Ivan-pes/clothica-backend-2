import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
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
      minlength: 8,
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
