import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
    },

    email: {
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
    avatar: {
      type: String,
      required: false,
      default: "", //"https://ac.goit.global/fullstack/react/default-avatar.jpg", hier should be a default avatar URL!!!
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", function () {
  if (this.isNew && !this.username) {
    this.username = this.email;
  }
});

userSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.password;
    return ret;
  },
});

export const UserModel = model("user", userSchema);
