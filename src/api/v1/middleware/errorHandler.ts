import { Request, Response, NextFunction } from "express";

// Custom error handling middleware
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Log the error stack for debugging
  console.error(err.stack);

  // Check for different error types
  if (err.name === 'ValidationError') {
    // Handle validation errors (e.g., from Joi or other validation libraries)
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      details: err.details,  // Include validation error details
    });
  }

  if (err.name === 'ApplicationError') {
    // Handle application errors (internal errors that we define)
    return res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong in the application.',
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  }

  // Fallback to general error handler for unknown errors
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,  // Show stack trace only in development mode
  });
};

export default errorHandler;
