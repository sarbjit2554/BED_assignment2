import request from "supertest";
import app from "../src/app";

describe("Employee API", () => {
  let employeeId: string;

  it("should create a new employee", async () => {
    const res = await request(app).post("/employees").send({
      name: "John Doe",
      position: "Developer",
      email: "johndoe@example.com",
      branchId: "001",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    employeeId = res.body.id;
  });

  it("should return 400 when creating an employee with invalid data", async () => {
    const res = await request(app).post("/employees").send({
      name: "JD",
      position: "",
      email: "invalid-email",
      branchId: "", // Invalid branchId
    });

    expect(res.status).toBe(400);
    expect(res.body.errors).toEqual(expect.arrayContaining([
      expect.stringContaining('position should have a minimum length of 3'),
      expect.stringContaining('email must be a valid email'),
      expect.stringContaining('"branchId" is a required field'),
    ]));
  });

  
});
