import { Request, Response } from "express";
import * as BranchService from "../services/branch.service";

// Create Branch
export const createBranch = async (req: Request, res: Response) => {
  try {
    const { name, address, phone } = req.body;
    const newBranch = await BranchService.createBranch({ name, address, phone });
    res.status(201).json(newBranch);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: "Failed to create branch", error: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};

// Get All Branches
export const getAllBranches = async (req: Request, res: Response) => {
  try {
    const branches = await BranchService.getAllBranches();
    if (branches.length > 0) {
      res.json(branches);
    } else {
      res.status(404).json({ message: "No branches found" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: "Failed to retrieve branches", error: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};

// Get Branch by ID
export const getBranchById = async (req: Request, res: Response) => {
  try {
    const branch = await BranchService.getBranchById(req.params.id);
    if (branch) {
      res.json(branch);
    } else {
      res.status(404).json({ message: "Branch not found" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: "Failed to retrieve branch", error: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};

// Update Branch
export const updateBranch = async (req: Request, res: Response) => {
  try {
    const updatedBranch = await BranchService.updateBranch(req.params.id, req.body);
    if (updatedBranch) {
      res.json(updatedBranch);
    } else {
      res.status(404).json({ message: "Branch not found" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: "Failed to update branch", error: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};

// Delete Branch
export const deleteBranch = async (req: Request, res: Response) => {
  try {
    const success = await BranchService.deleteBranch(req.params.id);
    if (success) {
      res.json({ message: "Branch deleted successfully" });
    } else {
      res.status(404).json({ message: "Branch not found" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: "Failed to delete branch", error: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};
