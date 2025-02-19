import { validateCreateEmployee, validateUpdateEmployee } from '../src/api/v1/middleware/validation.middleware';
import { Request, Response, NextFunction } from 'express';

describe('Employee Validation Middleware', () => {

  // Test validateCreateEmployee middleware
  it('should validate create employee payload', () => {
    const req = {
      body: {
        name: 'John Doe',
        position: 'Developer',
        department: 'Engineering',
      },
    } as Request;
    const res = {} as Response;
    const next = jest.fn();

    validateCreateEmployee(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  // Test validateUpdateEmployee middleware
  it('should validate update employee payload', () => {
    const req = {
      body: {
        name: 'Jane Doe',
        position: 'Senior Developer',
        department: 'Engineering',
      },
    } as Request;
    const res = {} as Response;
    const next = jest.fn();

    validateUpdateEmployee(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  // Test when validateCreateEmployee fails
  it('should return 400 if create employee payload is invalid', () => {
    const req = { body: { name: '', position: '', department: '' } } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    validateCreateEmployee(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid employee data' });
    expect(next).not.toHaveBeenCalled();
  });

  // Test when validateUpdateEmployee fails
  it('should return 400 if update employee payload is invalid', () => {
    const req = { body: { name: '', position: '', department: '' } } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    validateUpdateEmployee(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid employee data' });
    expect(next).not.toHaveBeenCalled();
  });

});
