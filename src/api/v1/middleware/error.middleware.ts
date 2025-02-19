import { Request, Response, NextFunction } from 'express';
import { ValidationError, NotFoundError, InternalServerError } from '../utils/error';

interface AppError extends Error {
  statusCode?: number;
}

// Enhanced Error Handler Middleware
export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error(`[ERROR] ${err.message}`);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err instanceof ValidationError) {
    statusCode = 400;
  } else if (err instanceof NotFoundError) {
    statusCode = 404;
  } else if (err instanceof InternalServerError) {
    statusCode = 500;
  }

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
    },
  });
};
