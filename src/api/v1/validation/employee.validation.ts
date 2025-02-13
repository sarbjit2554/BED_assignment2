// src/api/v1/validation/employee.validation.ts

import Joi from "joi";

// Validation schema for creating an employee
export const createEmployeeSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.base': '"name" should be a type of text',
    'string.empty': '"name" cannot be empty',
    'string.min': '"name" should have a minimum length of 3',
    'any.required': '"name" is a required field',
  }),
  position: Joi.string().min(3).required().messages({
    'string.base': '"position" should be a type of text',
    'string.empty': '"position" cannot be empty',
    'string.min': '"position" should have a minimum length of 3',
    'any.required': '"position" is a required field',
  }),
  email: Joi.string().email().required().messages({
    'string.base': '"email" should be a type of text',
    'string.email': '"email" must be a valid email',
    'any.required': '"email" is a required field',
  }),
  branchId: Joi.string().required().messages({
    'string.base': '"branchId" should be a type of text',
    'any.required': '"branchId" is a required field',
  }),
});

// Validation schema for updating an employee
export const updateEmployeeSchema = Joi.object({
  name: Joi.string().min(3).optional().messages({
    'string.base': '"name" should be a type of text',
    'string.empty': '"name" cannot be empty',
    'string.min': '"name" should have a minimum length of 3',
  }),
  position: Joi.string().min(3).optional().messages({
    'string.base': '"position" should be a type of text',
    'string.empty': '"position" cannot be empty',
    'string.min': '"position" should have a minimum length of 3',
  }),
  email: Joi.string().email().optional().messages({
    'string.base': '"email" should be a type of text',
    'string.email': '"email" must be a valid email',
  }),
  branchId: Joi.string().optional().messages({
    'string.base': '"branchId" should be a type of text',
  }),
});
