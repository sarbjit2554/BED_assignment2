import { Request, Response } from "express";
import Employee from "../models/employee.model"; // Ensure this import matches your model structure

// ✅ Create Employee
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { name, email, department, branchId } = req.body;
    const newEmployee = await Employee.create({ name, email, department, branchId });

    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error });
  }
};

// ✅ Get All Employees
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving employees", error });
  }
};

// ✅ Get Employee by ID
export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving employee", error });
  }
};

// ✅ Get Employees by Branch
export const getEmployeesByBranch = async (req: Request, res: Response) => {
  try {
    const { branchId } = req.params;
    const employees = await Employee.find({ branchId });

    if (!employees.length) {
      return res.status(404).json({ message: "No employees found for this branch" });
    }

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving employees", error });
  }
};

// ✅ Get Employees by Department
export const getEmployeesByDepartment = async (req: Request, res: Response) => {
  try {
    const { department } = req.params;
    const employees = await Employee.find({ department });

    if (!employees.length) {
      return res.status(404).json({ message: "No employees found in this department" });
    }

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving employees", error });
  }
};

// ✅ Update Employee
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
};

// ✅ Delete Employee
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
};
