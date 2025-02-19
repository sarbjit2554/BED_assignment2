import { Request, Response } from "express";
import * as EmployeeService from "../services/employee.service";

// CreateEmployee
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await EmployeeService.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error: unknown) {
    // Type guard to narrow the error type to an Error object
    if (error instanceof Error) {
      return res.status(500).json({ message: "Failed to create employee", error: error.message });
    }
    // Handle unexpected error type
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};


// Get All Employees
export const getAllEmployees = (req: Request, res: Response) => {
  res.json(EmployeeService.getAllEmployees());
};

// Get Employee by ID
export const getEmployeeById = (req: Request, res: Response) => {
  const employee = EmployeeService.getEmployeeById(req.params.id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
};

// Update Employee
export const updateEmployee = (req: Request, res: Response) => {
  const updatedEmployee = EmployeeService.updateEmployee(req.params.id, req.body);
  if (updatedEmployee) {
    res.json(updatedEmployee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
};

// Delete Employee
export const deleteEmployee = (req: Request, res: Response) => {
  const success = EmployeeService.deleteEmployee(req.params.id);
  if (success) {
    res.json({ message: "Employee deleted successfully." });
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
};

// Get Employees by Branch
export const getEmployeesByBranch = (req: Request, res: Response) => {
  const employees = EmployeeService.getEmployeesByBranch(req.params.branchId);
  if (employees.length > 0) {
    res.json(employees);
  } else {
    res.status(404).json({ message: "No employees found for this branch" });
  }
};

// Get Employees by Department
export const getEmployeesByDepartment = (req: Request, res: Response) => {
  const employees = EmployeeService.getEmployeesByDepartment(req.params.department);
  if (employees.length > 0) {
    res.json(employees);
  } else {
    res.status(404).json({ message: "No employees found in this department" });
  }
};
