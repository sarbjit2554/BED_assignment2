import { Request, Response, NextFunction } from "express";
import { createEmployeeSchema, updateEmployeeSchema } from "../validation/employee.validation";
import { createBranchSchema } from "../validation/branch.validation";

// Middleware for validating employee creation
export const validateCreateEmployee = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createEmployeeSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: error.details.map((err) => err.message) });
  }
  next();
};

// Middleware for validating employee update
export const validateUpdateEmployee = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updateEmployeeSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: error.details.map((err) => err.message) });
  }
  next();
};

// Middleware for validating branch creation
export const validateCreateBranch = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createBranchSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: error.details.map((err) => err.message) });
  }
  next();
};
