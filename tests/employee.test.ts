import request from "supertest";
import app from "../src/app";

describe("Employee API", () => {
  let employeeId: string;

  it("should create a new employee", async () => {
    const res = await request(app).post("/employees").send({
      name: "John Doe",
      position: "Developer",
      department: "Engineering",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      branchId: "001",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    employeeId = res.body.id;
  });

  it("should get all employees", async () => {
    const res = await request(app).get("/employees");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get an employee by ID", async () => {
    const res = await request(app).get(`/employees/${employeeId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(employeeId);
  });

  it("should update an employee", async () => {
    const res = await request(app).put(`/employees/${employeeId}`).send({
      position: "Senior Developer",
    });

    expect(res.status).toBe(200);
    expect(res.body.position).toBe("Senior Developer");
  });

  it("should delete an employee", async () => {
    const res = await request(app).delete(`/employees/${employeeId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Employee deleted successfully.");
  });
});
