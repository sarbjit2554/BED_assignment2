import Joi from "joi";

// Validation schema for creating a branch
export const createBranchSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.base': '"name" should be a type of text',
    'string.empty': '"name" cannot be empty',
    'string.min': '"name" should have a minimum length of 3',
    'any.required': '"name" is a required field',
  }),
  address: Joi.string().min(10).required().messages({
    'string.base': '"address" should be a type of text',
    'string.empty': '"address" cannot be empty',
    'string.min': '"address" should have a minimum length of 10',
    'any.required': '"address" is a required field',
  }),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'string.base': '"phone" should be a type of text',
    'string.empty': '"phone" cannot be empty',
    'string.pattern.base': '"phone" must be a valid phone number with 10 digits',
    'any.required': '"phone" is a required field',
  }),
});
