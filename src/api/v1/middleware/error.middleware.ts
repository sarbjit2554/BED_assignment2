import { Request, Response, NextFunction } from 'express';

// Custom error interface
interface AppError extends Error {
  statusCode?: number;
}

// Error-handling middleware
export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error(`[ERROR] ${err.message}`);  // Log the error

  const statusCode = err.statusCode || 500; // Default to 500 if no status is set
  res.status(statusCode).json({
    error: {
      message: err.message || 'Internal Server Error',
      statusCode,
    },
  });
};
