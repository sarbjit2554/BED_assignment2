import { Request, Response } from "express";
import * as EmployeeService from "../services/employee.service";

// CreateEmployee
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await EmployeeService.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: "Failed to create employee", error: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};

// Get All Employees
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await EmployeeService.getAllEmployees();
    if (employees.length > 0) {
      res.json(employees);
    } else {
      res.status(404).json({ message: "No employees found" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: "Failed to get employees", error: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};

// Get Employee by ID
export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await EmployeeService.getEmployeeById(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: "Failed to get employee", error: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};

// Update Employee
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const updatedEmployee = await EmployeeService.updateEmployee(req.params.id, req.body);
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: "Failed to update employee", error: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};

// Delete Employee
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const success = await EmployeeService.deleteEmployee(req.params.id);
    if (success) {
      res.json({ message: "Employee deleted successfully." });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: "Failed to delete employee", error: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};

// Get Employees by Branch
export const getEmployeesByBranch = async (req: Request, res: Response) => {
  try {
    const employees = await EmployeeService.getEmployeesByBranch(req.params.branchId);
    if (employees.length > 0) {
      res.json(employees);
    } else {
      res.status(404).json({ message: "No employees found for this branch" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: "Failed to get employees by branch", error: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};

// Get Employees by Department
export const getEmployeesByDepartment = async (req: Request, res: Response) => {
  try {
    const employees = await EmployeeService.getEmployeesByDepartment(req.params.department);
    if (employees.length > 0) {
      res.json(employees);
    } else {
      res.status(404).json({ message: "No employees found in this department" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: "Failed to get employees by department", error: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};
