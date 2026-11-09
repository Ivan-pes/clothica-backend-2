import mongoose from 'mongoose';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
};

export const logoutUser = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies ?? {};

    if (accessToken) {
      await mongoose.connection.collection('sessions').deleteOne({ accessToken });
    }

    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);
    res.clearCookie('sessionId', cookieOptions);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
