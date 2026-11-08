import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { SessionModel } from '../models/session.js';

export const authenticate = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      throw createHttpError(401, 'Not authenticated');
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    const session = await SessionModel.findOne({
      accessToken,
      userId: decoded.userId,
    });

    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    req.user = {
      id: decoded.userId,
    };

    next();
  } catch (error) {
    next(
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError'
        ? createHttpError(401, 'Invalid or expired token')
        : error
    );
  }
};