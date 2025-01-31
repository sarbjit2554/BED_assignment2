import { Employee } from "../interfaces/employee.interface";

const employees: Employee[] = []; // Temporary in-memory storage

// Create Employee
export const createEmployee = (employee: Omit<Employee, "id">): Employee => {
  const newEmployee = { id: `${Date.now()}`, ...employee };
  employees.push(newEmployee);
  return newEmployee;
};

// Get All Employees
export const getAllEmployees = (): Employee[] => employees;

// Get Employee by ID
export const getEmployeeById = (id: string): Employee | undefined => 
  employees.find(emp => emp.id === id);

// Update Employee
export const updateEmployee = (id: string, updates: Partial<Employee>): Employee | null => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return null;
  
  employees[index] = { ...employees[index], ...updates };
  return employees[index];
};

// Delete Employee
export const deleteEmployee = (id: string): boolean => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return false;
  
  employees.splice(index, 1);
  return true;
};

// Get Employees by Branch
export const getEmployeesByBranch = (branchId: string): Employee[] => {
  return employees.filter(emp => emp.branchId === branchId);
};

// Get Employees by Department
export const getEmployeesByDepartment = (department: string): Employee[] => {
  return employees.filter(emp => emp.department === department);
};
