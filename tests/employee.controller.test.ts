// tests/employee.controller.test.ts
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } from "../src/api/v1/controllers/employee.controller";
import * as EmployeeService from "../src/api/v1/services/employee.service"; // Adjust path if needed
import { mockRequest, mockResponse } from "../src/api/v1/utils/test-utils"; // Make sure this is available

jest.mock("../src/api/v1/services/employee.service"); // Mock the service layer

describe("Employee Controller", () => {
  it("should create a new employee", async () => {
    const newEmployee = { id: "1", name: "John Doe", position: "Developer", department: "Engineering", salary: 50000 };
    (EmployeeService.createEmployee as jest.Mock).mockResolvedValue(newEmployee);

    const req = mockRequest({
      body: { name: "John Doe", position: "Developer", department: "Engineering", salary: 50000 },
    });
    const res = mockResponse();

    await createEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newEmployee);
  });

  it("should get all employees", async () => {
    const employees = [
      { id: "1", name: "John Doe", position: "Developer", department: "Engineering", salary: 50000 },
      { id: "2", name: "Jane Smith", position: "Manager", department: "HR", salary: 60000 },
    ];
    (EmployeeService.getAllEmployees as jest.Mock).mockResolvedValue(employees);

    const req = mockRequest();
    const res = mockResponse();

    await getAllEmployees(req, res);

    expect(res.json).toHaveBeenCalledWith(employees);
  });

  it("should get an employee by ID", async () => {
    const employee = { id: "1", name: "John Doe", position: "Developer", department: "Engineering", salary: 50000 };
    (EmployeeService.getEmployeeById as jest.Mock).mockResolvedValue(employee);

    const req = mockRequest({ params: { id: "1" } });
    const res = mockResponse();

    await getEmployeeById(req, res);

    expect(res.json).toHaveBeenCalledWith(employee);
  });

  it("should return 404 when employee not found", async () => {
    (EmployeeService.getEmployeeById as jest.Mock).mockResolvedValue(null);

    const req = mockRequest({ params: { id: "1" } });
    const res = mockResponse();

    await getEmployeeById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Employee not found" });
  });

  it("should update an employee", async () => {
    const updatedEmployee = { id: "1", name: "John Doe", position: "Senior Developer", department: "Engineering", salary: 65000 };
    (EmployeeService.updateEmployee as jest.Mock).mockResolvedValue(updatedEmployee);

    const req = mockRequest({ params: { id: "1" }, body: { name: "John Doe", position: "Senior Developer", department: "Engineering", salary: 65000 } });
    const res = mockResponse();

    await updateEmployee(req, res);

    expect(res.json).toHaveBeenCalledWith(updatedEmployee);
  });

  it("should return 404 when updating an employee that does not exist", async () => {
    (EmployeeService.updateEmployee as jest.Mock).mockResolvedValue(null);

    const req = mockRequest({ params: { id: "2" }, body: { name: "Nonexistent Employee" } });
    const res = mockResponse();

    await updateEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Employee not found" });
  });



  it("should return 404 when deleting an employee that does not exist", async () => {
    (EmployeeService.deleteEmployee as jest.Mock).mockResolvedValue(false);

    const req = mockRequest({ params: { id: "2" } });
    const res = mockResponse();

    await deleteEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Employee not found" });
  });
});
