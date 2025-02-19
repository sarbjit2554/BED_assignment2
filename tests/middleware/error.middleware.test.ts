import { errorHandler } from '../../src/api/v1/middleware/error.middleware';
import { ValidationError, NotFoundError } from '../../src/api/v1/utils/error';
import { Request, Response, NextFunction } from 'express';

describe('Error Handling Middleware', () => {
  it('should return 400 for ValidationError', () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    const error = new ValidationError('Invalid input');

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: { message: 'Invalid input', statusCode: 400 },
    });
  });

  it('should return 404 for NotFoundError', () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    const error = new NotFoundError('Resource not found');

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: { message: 'Resource not found', statusCode: 404 },
    });
  });

  it('should return 500 for unknown errors', () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    const error = new Error('Unexpected error');

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: { message: 'Unexpected error', statusCode: 500 },
    });
  });
});
