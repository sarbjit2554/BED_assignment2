import { Request, Response } from "express";
import * as EmployeeService from "../services/employee.service";

export const createEmployee = (req: Request, res: Response) => {
  const employee = EmployeeService.createEmployee(req.body);
  res.status(201).json(employee);
};

export const getAllEmployees = (req: Request, res: Response) => {
  res.json(EmployeeService.getAllEmployees());
};

export const getEmployeeById = (req: Request, res: Response) => {
  const employee = EmployeeService.getEmployeeById(req.params.id);
  employee ? res.json(employee) : res.status(404).json({ message: "Employee not found" });
};

export const updateEmployee = (req: Request, res: Response) => {
  const updatedEmployee = EmployeeService.updateEmployee(req.params.id, req.body);
  updatedEmployee ? res.json(updatedEmployee) : res.status(404).json({ message: "Employee not found" });
};

export const deleteEmployee = (req: Request, res: Response) => {
    const success = EmployeeService.deleteEmployee(req.params.id);
    success ? res.json({ message: "Employee deleted successfully." }) : res.status(404).json({ message: "Employee not found" });
  };
  
