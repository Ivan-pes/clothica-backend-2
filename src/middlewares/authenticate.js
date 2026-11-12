import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import { Session } from "../models/session.js";
import { UserModel } from "../models/user.js";

const getBearerToken = (req) => {
  const [type, token] = req.headers.authorization?.split(" ") ?? [];
  return type === "Bearer" && token ? token : null;
};

const findSession = async (req) => {
  const { accessToken, sessionId } = req.cookies ?? {};

  if (accessToken) {
    if (!sessionId || !isValidObjectId(sessionId)) {
      throw createHttpError(401, "Session not found");
    }
    return Session.findOne({ accessToken, _id: sessionId });
  }

  const bearerToken = getBearerToken(req);
  if (bearerToken) {
    return Session.findOne({ accessToken: bearerToken });
  }

  throw createHttpError(401, "Missing access token");
};

export const authenticate = async (req, res, next) => {
  const session = await findSession(req);
  if (!session) {
    throw createHttpError(401, "Session not found");
  }

  if (session.accessTokenValidUntil.getTime() <= Date.now()) {
    throw createHttpError(401, "Access token expired");
  }

  const user = await UserModel.findById(session.userId);

  if (!user) {
    throw createHttpError(401);
  }
  req.user = user;
  req.session = session;
  next();
};
