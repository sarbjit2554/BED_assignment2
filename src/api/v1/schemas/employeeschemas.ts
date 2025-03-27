import Joi, { ObjectSchema } from "joi";

// Schema for creating a new employee
export const createEmployeeSchema: ObjectSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "any.required": "Employee name is required",
    "string.empty": "Employee name cannot be empty",
    "string.min": "Employee name must be at least 3 characters long",
    "string.max": "Employee name cannot exceed 50 characters",
  }),
  position: Joi.string().required().messages({
    "any.required": "Position is required",
    "string.empty": "Position cannot be empty",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.empty": "Email cannot be empty",
    "string.email": "Invalid email format, please provide a valid email address.",
  }),
  department: Joi.string().optional().messages({
    "string.empty": "Department cannot be empty",
  }),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .optional()
    .messages({
      "string.empty": "Phone number cannot be empty",
      "string.pattern.base": "Phone number must be a 10-digit number without spaces or dashes.",
    }),
  branchId: Joi.string().min(1).required().messages({
    "any.required": "Branch ID is required",
    "string.empty": "Branch ID cannot be empty",
    "string.min": "Branch ID must be a valid string",
  }),
});

// Schema for updating an employee
export const updateEmployeeSchema: ObjectSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional().messages({
    "string.min": "Employee name must be at least 3 characters long",
    "string.max": "Employee name cannot exceed 50 characters",
  }),
  position: Joi.string().optional().messages({
    "string.empty": "Position cannot be empty",
  }),
  email: Joi.string().email().optional().messages({
    "string.email": "Invalid email format",
  }),
  department: Joi.string().optional().messages({
    "string.empty": "Department cannot be empty",
  }),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .optional()
    .messages({
      "string.empty": "Phone number cannot be empty",
      "string.pattern.base": "Phone number must be a 10-digit number",
    }),
  branchId: Joi.string().optional().messages({
    "string.empty": "Branch ID cannot be empty",
  }),
});

// Schema for deleting an employee (by ID)
export const deleteEmployeeSchema: ObjectSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Employee ID is required",
    "string.base": "Employee ID must be a valid string",
  }),
});
