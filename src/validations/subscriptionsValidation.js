import Joi from 'joi';

export const subscriptionSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email()
    .max(64)
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Please provide a valid email address',
      'string.max': 'Email length must be at most {#limit} characters',
      'any.required': 'Email is required',
    }),
});