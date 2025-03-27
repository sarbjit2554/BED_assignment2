import Joi, { ObjectSchema } from "joi";

// Schema for creating a new branch
export const createBranchSchema: ObjectSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "any.required": "Branch name is required",
    "string.empty": "Branch name cannot be empty",
    "string.min": "Branch name must be at least 3 characters long",
    "string.max": "Branch name cannot exceed 50 characters",
  }),
  address: Joi.string().required().messages({
    "any.required": "Address is required",
    "string.empty": "Address cannot be empty",
  }),
  phone: Joi.string().required().custom((value, helpers) => {
    // Clean the phone number by removing non-numeric characters
    const cleanedPhone = value.replace(/\D/g, ''); // Remove all non-numeric characters
    if (cleanedPhone.length === 10) {
      return cleanedPhone; // Return the sanitized phone number
    }
    return helpers.error('string.pattern.base'); // Error if phone number is not valid
  }).pattern(/^[0-9]{10}$/).messages({
    "any.required": "Phone number is required",
    "string.empty": "Phone number cannot be empty",
    "string.pattern.base": "Phone number must be a 10-digit number",
  }),
});

// Schema for updating a branch
export const updateBranchSchema: ObjectSchema = Joi.object({
  name: Joi.string().min(3).max(50).messages({
    "string.min": "Branch name must be at least 3 characters long",
    "string.max": "Branch name cannot exceed 50 characters",
  }),
  address: Joi.string().messages({
    "string.empty": "Address cannot be empty",
  }),
  phone: Joi.string().custom((value, helpers) => {
    // Clean the phone number by removing non-numeric characters
    const cleanedPhone = value.replace(/\D/g, ''); // Remove all non-numeric characters
    if (cleanedPhone.length === 10) {
      return cleanedPhone; // Return the sanitized phone number
    }
    return helpers.error('string.pattern.base'); // Error if phone number is not valid
  }).pattern(/^[0-9]{10}$/).messages({
    "string.pattern.base": "Phone number must be a 10-digit number",
  }),
});

// Schema for deleting a branch (by ID)
export const deleteBranchSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'any.required': 'Branch ID is required',
    'number.base': 'Branch ID must be a number',
  }),
});

// Schema for validating branch model (used internally)
export const branchModelSchema: ObjectSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Branch ID is required",
  }),
  name: Joi.string().min(3).max(50).required(),
  address: Joi.string().required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
});
