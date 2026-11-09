import { Joi, Segments } from 'celebrate';

export const updateCurrentUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(2).max(32),
    lastName: Joi.string().trim().min(2).max(32),
    phone: Joi.string()
      .trim()
      .pattern(/^\+?[\d\s()-]{10,20}$/)
      .messages({ 'string.pattern.base': 'Невірний формат номера телефону' }),
    city: Joi.string().trim().min(2).max(64),
    postOffice: Joi.string().trim().min(1).max(64),
  }).min(1),
};
