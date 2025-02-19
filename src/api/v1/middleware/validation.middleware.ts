import { Request, Response, NextFunction } from 'express';
import { createEmployeeSchema, updateEmployeeSchema } from '../validation/employee.validation';

export const validateCreateEmployee = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createEmployeeSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((detail) => detail.message),
    });
  }

  next();
};

export const validateUpdateEmployee = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updateEmployeeSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((detail) => detail.message),
    });
  }

  next();
};
