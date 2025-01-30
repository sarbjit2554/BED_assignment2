import { Employee } from "../interfaces/employee.interface";

const employees: Employee[] = []; // Temporary in-memory storage

export const createEmployee = (employee: Omit<Employee, "id">): Employee => {
  const newEmployee = { id: `${Date.now()}`, ...employee };
  employees.push(newEmployee);
  return newEmployee;
};

export const getAllEmployees = (): Employee[] => employees;

export const getEmployeeById = (id: string): Employee | undefined => 
  employees.find(emp => emp.id === id);

export const updateEmployee = (id: string, updates: Partial<Employee>): Employee | null => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return null;
  
  employees[index] = { ...employees[index], ...updates };
  return employees[index];
};

export const deleteEmployee = (id: string): boolean => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return false;
  
  employees.splice(index, 1);
  return true;
};
