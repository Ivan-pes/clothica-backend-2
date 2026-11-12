import { isValidObjectId } from "mongoose";
import { Session } from "../../models/session.js";

export const logoutUser = async (req, res) => {
  const sessionId = req.cookies?.sessionId ?? req.session?._id?.toString();

  if (sessionId && isValidObjectId(sessionId)) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie("sessionId", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(204).send();
};
