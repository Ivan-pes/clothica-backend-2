import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { Session } from "../../models/session.js";
import { UserModel } from "../../models/user.js";
import { createSession, setSessionCookies } from "../../services/auth.js";

export const loginUser = async (req, res) => {
  const { phone, password } = req.body;

  const user = await UserModel.findOne({ phone }).select("+password");
  if (!user) {
    throw createHttpError(401, "Invalid credentials");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, "Invalid credentials");
  }

  await Session.deleteMany({ userId: user._id });

  const newSession = await createSession(user._id);
  setSessionCookies(res, newSession);

  res.status(200).json(user);
};
