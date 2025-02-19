// tests/utils/test-utils.ts

import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

// Mock Request object with required methods
export const mockRequest = (overrides: object = {}): Request => {
  const req: Partial<Request> = {
    params: {},
    body: {},
    query: {},
    ...overrides,
  };

  // Returning the mock with all the required methods and types
  return req as Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;
};

// Mock Response object
export const mockResponse = (): Response => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
  return res as Response;
};
