import { SessionModel } from '../../models/session.js';

export const logoutUser = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    await SessionModel.deleteOne({ accessToken });

    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.status(200).json({
      message: 'Logout successful',
    });
  } catch (error) {
    next(error);
  }
};