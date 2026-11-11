import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UserModel } from '../../models/user.js';
import { createSession, setSessionCookies } from '../../services/auth.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      throw createHttpError(400, 'Name, phone and password are required');
    }

    const normalizedName = name.trim();
    const normalizedPhone = phone.trim();

    if (normalizedName.length < 2 || normalizedName.length > 32) {
      throw createHttpError(400, 'Invalid name');
    }

    if (!/^\+38\d{10}$/.test(normalizedPhone)) {
      throw createHttpError(400, 'Invalid phone number');
    }

    if (password.length < 8 || password.length > 128) {
      throw createHttpError(400, 'Invalid password');
    }

    const existingUser = await UserModel.findOne({
      phone: normalizedPhone,
    });

    if (existingUser) {
      throw createHttpError(409, 'Phone number is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name: normalizedName,
      phone: normalizedPhone,
      password: hashedPassword,
    });

    const session = await createSession(user._id);
    setSessionCookies(res, session);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
      },
    });
  } catch (error) {
    next(error);
  }
};
