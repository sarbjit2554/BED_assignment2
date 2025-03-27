import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";
import { successResponse, errorResponse } from "../models/responsemodel";
import type { Employee } from "../interfaces/EmployeeInterface";

/**
 * Handles retrieving all employees.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employees: Employee[] = await employeeService.fetchAllEmployees();
        res.status(200).json(successResponse(employees, "Employees retrieved"));
    } catch (error) {
        next(error);
    }
};

/**
 * Handles creating a new employee.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { name, position, department, email, phone, branchId } = req.body;
    
    // Validation for required fields
    const requiredFields = { name, position, department, email, phone, branchId };
    for (const [field, value] of Object.entries(requiredFields)) {
        if (!value) {
            res.status(400).json(errorResponse(`${field} is required.`));
            return;
        }
    }

    try {
        const newEmployee: Employee = await employeeService.createEmployee(req.body);
        res.status(201).json(successResponse(newEmployee, "Employee created"));
    } catch (error) {
        next(error);
    }
};

/**
 * Handles retrieving an employee by ID.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employeeId = req.params.id;
        const employee: Employee | undefined = await employeeService.getEmployeeById(employeeId);

        if (!employee) {
            res.status(404).json(errorResponse("Employee not found"));
            return;
        }

        res.status(200).json(successResponse(employee, "Employee retrieved"));
    } catch (error) {
        next(error);
    }
};

/**
 * Handles retrieving employees by branch.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getEmployeesByBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branchId = req.params.branchId;
        const employees = await employeeService.getEmployeesByBranch(branchId);
        res.status(200).json(successResponse(employees, "Employees retrieved"));
    } catch (error) {
        next(error);
    }
};

/**
 * Handles retrieving employees by department.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getEmployeesByDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const department = req.params.department;
        const employees = await employeeService.getEmployeesByDepartment(department);
        res.status(200).json(successResponse(employees, "Employees retrieved"));
    } catch (error) {
        next(error);
    }
};

/**
 * Handles updating an employee's details.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employeeId = req.params.id;
        const updatedEmployee: Employee | null = await employeeService.updateEmployee(employeeId, req.body);

        if (!updatedEmployee) {
            res.status(404).json(errorResponse("Employee not found"));
            return;
        }

        res.status(200).json(successResponse(updatedEmployee, "Employee updated"));
    } catch (error) {
        next(error);
    }
};

/**
 * Handles deleting an employee.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employeeId = req.params.id;
        await employeeService.deleteEmployee(employeeId);

        res.status(200).json(successResponse({}, `Employee with ID ${employeeId} deleted successfully`));
    } catch (error) {
        next(error);
    }
};
