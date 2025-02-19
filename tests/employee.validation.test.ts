import { validateCreateEmployee, validateUpdateEmployee } from '../src/api/v1/middleware/validation.middleware';
import { Request, Response, NextFunction } from 'express';

describe('Employee Validation Middleware', () => {  
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should validate create employee payload', () => {
    const req = {
      body: { name: 'John Doe', position: 'Developer', department: 'Engineering' },
    } as Partial<Request>;

    validateCreateEmployee(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 400 if create employee payload is invalid (empty values)', () => {
    const req = { body: { name: '', position: '', department: '' } } as Partial<Request>;

    validateCreateEmployee(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: expect.arrayContaining([expect.stringContaining('cannot be empty')]),
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 400 if name is missing in create employee payload', () => {
    const req = { body: { position: 'Developer', department: 'Engineering' } } as Partial<Request>;

    validateCreateEmployee(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: expect.arrayContaining([expect.stringContaining('name')]),
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should validate update employee payload', () => {
    const req = {
      body: { name: 'Jane Doe', position: 'Senior Developer', department: 'Engineering' },
    } as Partial<Request>;

    validateUpdateEmployee(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 400 if update employee payload is invalid', () => {
    const req = { body: { name: '', position: '', department: '' } } as Partial<Request>;

    validateUpdateEmployee(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: expect.arrayContaining([expect.stringContaining('cannot be empty')]),
    });
    expect(next).not.toHaveBeenCalled();
  });
});
