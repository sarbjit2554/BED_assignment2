import Joi from 'joi';
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  deleteEmployeeSchema
} from '../src/api/v1/schemas/employeeschemas';
import {
  createBranchSchema,
  updateBranchSchema,
  deleteBranchSchema
} from '../src/api/v1/schemas/branchschemas';

describe('Validation Schemas', () => {
  // Employee Schema Validation Tests
  describe('Employee Schema Validation', () => {
    it('should pass for valid employee data', () => {
      const validEmployee = {
        name: 'John Doe',
        position: 'Software Engineer',
        email: 'john.doe@example.com',
        branchId: 'branch123',
      };
      const { error } = createEmployeeSchema.validate(validEmployee);
      expect(error).toBeUndefined(); // No validation error
    });

    it('should fail if employee name is too short', () => {
      const invalidEmployee = {
        name: 'Jo',
        position: 'Software Engineer',
        email: 'john.doe@example.com',
        branchId: 'branch123',
      };
      const { error } = createEmployeeSchema.validate(invalidEmployee);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain('name');
    });

    it('should fail if employee email is invalid', () => {
      const invalidEmployee = {
        name: 'John Doe',
        position: 'Software Engineer',
        email: 'invalid-email',
        branchId: 'branch123',
      };
      const { error } = createEmployeeSchema.validate(invalidEmployee);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain('email');
    });

    it('should fail if employee branchId is missing', () => {
      const invalidEmployee = {
        name: 'John Doe',
        position: 'Software Engineer',
        email: 'john.doe@example.com',
      };
      const { error } = createEmployeeSchema.validate(invalidEmployee);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain('branchId');
    });
  });

  // Branch Schema Validation Tests
  describe('Branch Schema Validation', () => {
    it('should pass for valid branch data', () => {
      const validBranch = {
        name: 'Main Branch',
        address: '123 Main St, City, Country',
        phone: '1234567890',
      };
      const { error } = createBranchSchema.validate(validBranch);
      expect(error).toBeUndefined();
    });

    it('should fail if branch name is too short', () => {
      const invalidBranch = {
        name: 'Br',
        address: '123 Main St',
        phone: '1234567890',
      };
      const { error } = createBranchSchema.validate(invalidBranch);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain('name');
    });

    it('should fail if branch address is too short', () => {
      const invalidBranch = {
        name: 'Main Branch',
        address: 'Short',
        phone: '1234567890',
      };
      const { error } = createBranchSchema.validate(invalidBranch);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain('address');
    });

    it('should fail if branch phone is invalid', () => {
      const invalidBranch = {
        name: 'Main Branch',
        address: '123 Main St, City, Country',
        phone: '12345',
      };
      const { error } = createBranchSchema.validate(invalidBranch);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain('phone');
    });
  });
});
