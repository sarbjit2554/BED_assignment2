// src/errors/apperror.ts
export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true; // to distinguish between operational errors and bugs
  
      // Capturing stack trace for debugging
      Error.captureStackTrace(this, this.constructor);
    }
  }
  