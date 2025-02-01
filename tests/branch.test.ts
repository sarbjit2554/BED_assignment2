import request from "supertest";
import app from "../src/app"; // Assuming app.ts is the entry point

describe("Branch API", () => {
  it("should create a new branch", async () => {
    const response = await request(app)
      .post("/branches")
      .send({
        name: "Main Branch",
        address: "123 Main St",
        phone: "555-1234",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Main Branch");
  });

  it("should return all branches", async () => {
    const response = await request(app).get("/branches");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return branch by ID", async () => {
    const newBranch = await request(app)
      .post("/branches")
      .send({
        name: "New Branch",
        address: "456 New St",
        phone: "555-5678",
      });

    const response = await request(app).get(`/branches/${newBranch.body.id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("New Branch");
  });

  it("should update a branch", async () => {
    const newBranch = await request(app)
      .post("/branches")
      .send({
        name: "Old Branch",
        address: "789 Old St",
        phone: "555-9876",
      });

    const response = await request(app)
      .put(`/branches/${newBranch.body.id}`)
      .send({ address: "456 Updated St" });

    expect(response.status).toBe(200);
    expect(response.body.address).toBe("456 Updated St");
  });

  it("should delete a branch", async () => {
    const newBranch = await request(app)
      .post("/branches")
      .send({
        name: "Delete Me",
        address: "123 Delete St",
        phone: "555-0000",
      });

    const response = await request(app).delete(`/branches/${newBranch.body.id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Branch deleted successfully");
  });
});
