import { createEmployeeSchema, updateEmployeeSchema } from "../src/api/v1/validation/employee.validation";

describe("Employee Validation Schema", () => {
  test("✅ Should validate a correct employee object", () => {
    const validEmployee = {
      name: "John Doe",
      position: "Software Engineer",
      email: "johndoe@example.com",
      branchId: "123",
    };

    const { error } = createEmployeeSchema.validate(validEmployee);
    expect(error).toBeUndefined();
  });

  test("❌ Should fail if 'name' is missing", () => {
    const invalidEmployee = {
      position: "Software Engineer",
      email: "johndoe@example.com",
      branchId: "123",
    };

    const { error } = createEmployeeSchema.validate(invalidEmployee);
    expect(error).toBeDefined();
    expect(error?.details?.[0]?.message).toContain('"name" is a required field');
  });

  test("✅ Should allow partial update with updateEmployeeSchema", () => {
    const updateData = { email: "newemail@example.com" };
    const { error } = updateEmployeeSchema.validate(updateData);
    expect(error).toBeUndefined();
  });

  test("❌ Should fail if email is invalid", () => {
    const invalidUpdate = { email: "invalid-email" };
    const { error } = updateEmployeeSchema.validate(invalidUpdate);
    expect(error).toBeDefined();
    expect(error?.details?.[0]?.message).toContain('"email" must be a valid email');
  });
});
