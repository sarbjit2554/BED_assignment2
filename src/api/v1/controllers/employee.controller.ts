import { Request, Response } from "express";
import * as EmployeeService from "../services/employee.service";

// Create Employee
export const createEmployee = (req: Request, res: Response) => {
  const employee = EmployeeService.createEmployee(req.body);
  res.status(201).json(employee);
};

// Get All Employees
export const getAllEmployees = (req: Request, res: Response) => {
  res.json(EmployeeService.getAllEmployees());
};

// Get Employee by ID
export const getEmployeeById = (req: Request, res: Response) => {
  const employee = EmployeeService.getEmployeeById(req.params.id);
  employee ? res.json(employee) : res.status(404).json({ message: "Employee not found" });
};

// Update Employee
export const updateEmployee = (req: Request, res: Response) => {
  const updatedEmployee = EmployeeService.updateEmployee(req.params.id, req.body);
  updatedEmployee ? res.json(updatedEmployee) : res.status(404).json({ message: "Employee not found" });
};

// Delete Employee
export const deleteEmployee = (req: Request, res: Response) => {
  const success = EmployeeService.deleteEmployee(req.params.id);
  success ? res.json({ message: "Employee deleted successfully." }) : res.status(404).json({ message: "Employee not found" });
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
