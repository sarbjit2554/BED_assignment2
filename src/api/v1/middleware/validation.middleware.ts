import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// Define Joi schema for employee validation
const employeeSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  position: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  branchId: Joi.number().integer().required(),
});

// Middleware function to validate creating an employee
export const validateCreateEmployee = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = employeeSchema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400).json({ errors: error.details.map((detail) => detail.message) });
    return; // Ensure no further execution
  }

  next(); // Proceed if validation is successful
};

// Middleware function to validate updating an employee (optional fields)
export const validateUpdateEmployee = (req: Request, res: Response, next: NextFunction): void => {
  const updateSchema = employeeSchema.fork(["name", "position", "email", "branchId"], (field) =>
    field.optional()
  );

  const { error } = updateSchema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400).json({ errors: error.details.map((detail) => detail.message) });
    return; // Ensure no further execution
  }

  next(); // Proceed if validation is successful
};
