import mongoose from 'mongoose';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
};

export const logoutUser = async (req, res, next) => {
  try {
    const { accessToken, sessionId } = req.cookies ?? {};

    // Supports both session schemes: lookup by accessToken or by the sessionId cookie.
    const conditions = [];
    if (accessToken) conditions.push({ accessToken });
    if (sessionId && mongoose.isValidObjectId(sessionId)) {
      conditions.push({ _id: new mongoose.Types.ObjectId(sessionId) });
    }

    if (conditions.length > 0) {
      await mongoose.connection.collection('sessions').deleteMany({ $or: conditions });
    }

    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);
    res.clearCookie('sessionId', cookieOptions);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
