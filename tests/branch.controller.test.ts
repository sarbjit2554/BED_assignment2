// tests/branch.controller.test.ts
import { createBranch, getAllBranches, getBranchById, updateBranch, deleteBranch } from "../src/api/v1/controllers/branch.controller";
import * as BranchService from "../src/api/v1/services/branch.service"; // Adjust path if needed
import { mockRequest, mockResponse } from "../src/api/v1/utils/test-utils"; // Make sure this is available

jest.mock("../src/api/v1/services/branch.service"); // Mock the service layer

describe("Branch Controller", () => {
  it("should create a new branch", async () => {
    const newBranch = { id: "1", name: "Main Branch", address: "123 Main St", phone: "123-456-7890" };
    (BranchService.createBranch as jest.Mock).mockResolvedValue(newBranch);

    const req = mockRequest({
      body: { name: "Main Branch", address: "123 Main St", phone: "123-456-7890" },
    });
    const res = mockResponse();

    await createBranch(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newBranch);
  });

  it("should get all branches", async () => {
    const branches = [{ id: "1", name: "Main Branch", address: "123 Main St", phone: "123-456-7890" }];
    (BranchService.getAllBranches as jest.Mock).mockResolvedValue(branches);

    const req = mockRequest();
    const res = mockResponse();

    await getAllBranches(req, res);

    expect(res.json).toHaveBeenCalledWith(branches);
  });

  it("should get a branch by ID", async () => {
    const branch = { id: "1", name: "Main Branch", address: "123 Main St", phone: "123-456-7890" };
    (BranchService.getBranchById as jest.Mock).mockResolvedValue(branch);

    const req = mockRequest({ params: { id: "1" } });
    const res = mockResponse();

    await getBranchById(req, res);

    expect(res.json).toHaveBeenCalledWith(branch);
  });

  it("should return 404 when branch not found", async () => {
    (BranchService.getBranchById as jest.Mock).mockResolvedValue(null);

    const req = mockRequest({ params: { id: "1" } });
    const res = mockResponse();

    await getBranchById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Branch not found" });
  });

  it("should update a branch", async () => {
    const updatedBranch = { id: "1", name: "Updated Branch", address: "456 Updated St", phone: "987-654-3210" };
    (BranchService.updateBranch as jest.Mock).mockResolvedValue(updatedBranch);

    const req = mockRequest({ params: { id: "1" }, body: { name: "Updated Branch", address: "456 Updated St", phone: "987-654-3210" } });
    const res = mockResponse();

    await updateBranch(req, res);

    expect(res.json).toHaveBeenCalledWith(updatedBranch);
  });

  it("should return 404 when updating a branch that does not exist", async () => {
    (BranchService.updateBranch as jest.Mock).mockResolvedValue(null);

    const req = mockRequest({ params: { id: "2" }, body: { name: "Nonexistent Branch" } });
    const res = mockResponse();

    await updateBranch(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Branch not found" });
  });

  it("should delete a branch", async () => {
    (BranchService.deleteBranch as jest.Mock).mockResolvedValue(true);

    const req = mockRequest({ params: { id: "1" } });
    const res = mockResponse();

    await deleteBranch(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: "Branch deleted" });
  });

  it("should return 404 when deleting a branch that does not exist", async () => {
    (BranchService.deleteBranch as jest.Mock).mockResolvedValue(false);

    const req = mockRequest({ params: { id: "2" } });
    const res = mockResponse();

    await deleteBranch(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Branch not found" });
  });
});
