import createHttpError from "http-errors";
import { UserModel } from "../../models/user.js";

export const getCurrentUser = async (req, res, next) => {
    try {
    const user = await UserModel.findById(
        req.user._id,
    );
    if (!user) {
        throw createHttpError(404, "User not found")
    };

        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
};
