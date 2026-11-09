import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 64,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 128,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const userSchema = new Schema(
  {
    name: { type: String, trim: true, maxlength: 32 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 64,
    },
    password: { type: String, required: true, minlength: 8, maxlength: 128 },
    lastName: { type: String, trim: true, maxlength: 32, default: '' },
    phone: { type: String, trim: true, default: '' },
    city: { type: String, trim: true, maxlength: 64, default: '' },
    postOffice: { type: String, trim: true, maxlength: 64, default: '' },
  },
  { timestamps: true, versionKey: false },
);

// If registration does not send a name, use the part of the email before "@".
userSchema.pre('validate', function () {
  if (!this.name && this.email) {
    this.name = this.email.split('@')[0].slice(0, 32);
  }
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const UserModel = model('user', userSchema);
