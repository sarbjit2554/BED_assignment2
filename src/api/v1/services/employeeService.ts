import { Employee } from "../interfaces/EmployeeInterface";
import {
    createDocument,
    getDocuments,
    updateDocument,
    deleteDocument,
} from "../repository/firebaseRepository";

const COLLECTION = "employees";
 
// Fetch all employees
export const fetchAllEmployees = async (): Promise<Employee[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data } as Employee;
    });
};
 
// Create a new employee
export const createEmployee = async (employee: Partial<Employee>): Promise<Employee> => {
    const id = await createDocument(COLLECTION, employee);
    return { id, ...employee } as Employee;
};
 
// Fetch employee by ID
export const getEmployeeById = async (id: string): Promise<Employee | undefined> => {
    const employees = await fetchAllEmployees();
    return employees.find((employee) => employee.id === id);
};
 
// Update an existing employee with additional validation
export const updateEmployee = async (
    id: string,
    employee: Partial<Employee>
): Promise<Employee> => {
   await updateDocument(COLLECTION, id, employee);
    return { id, ...employee } as Employee;
};
 
// Delete an employee
export const deleteEmployee = async (id: string): Promise<void> => {
    await deleteDocument(COLLECTION, id);
};
 
// Get all employees for a branch
export const getEmployeesByBranch = async (branchId: string): Promise<Employee[]> => {
    const employees = await fetchAllEmployees();
    return employees.filter((employee) => employee.branchId.toString() === branchId);
};
 
// Get all employees for a department
export const getEmployeesByDepartment = async (department: string): Promise<Employee[]> => {
    const employees = await fetchAllEmployees();
    return employees.filter((employee) => employee.department === department);
};