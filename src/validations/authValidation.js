import { Joi, Segments } from "celebrate";

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().max(100),
    phone: Joi.string()
      .pattern(/^\+[1-9]\d{1,14}$/)
      .required(),

    password: Joi.string().min(8).required(),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    phone: Joi.string()
      .pattern(/^\+[1-9]\d{1,14}$/)
      .required(),
    password: Joi.string().required(),
  }),
};
