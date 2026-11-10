import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UserModel } from '../../models/user.js';
import { createSession, setSessionCookies } from '../../services/auth.js';

export const loginUser = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      throw createHttpError(400, 'Phone and password are required');
    }

    const normalizedPhone = phone.trim();

    if (!/^\+38\d{10}$/.test(normalizedPhone)) {
      throw createHttpError(400, 'Invalid phone number');
    }

    const user = await UserModel.findOne({
      phone: normalizedPhone,
    });

    if (!user) {
      throw createHttpError(401, 'Invalid phone or password');
    }

    const passwordIsValid = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passwordIsValid) {
      throw createHttpError(401, 'Invalid phone or password');
    }

    const session = await createSession(user._id);
    setSessionCookies(res, session);

    res.status(200).json({
      message: 'Login successful',
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
