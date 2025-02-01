import { Request, Response } from "express";
import * as BranchService from "../services/branch.service";

// Create Branch
export const createBranch = (req: Request, res: Response) => {
  const { name, address, phone } = req.body;
  const newBranch = BranchService.createBranch({ name, address, phone });
  res.status(201).json(newBranch);
};

// Get All Branches
export const getAllBranches = (req: Request, res: Response) => {
  const branches = BranchService.getAllBranches();
  res.json(branches);
};

// Get Branch by ID
export const getBranchById = (req: Request, res: Response) => {
  const branch = BranchService.getBranchById(req.params.id);
  if (branch) {
    res.json(branch);
  } else {
    res.status(404).json({ message: "Branch not found" });
  }
};

// Update Branch
export const updateBranch = (req: Request, res: Response) => {
  const updatedBranch = BranchService.updateBranch(req.params.id, req.body);
  if (updatedBranch) {
    res.json(updatedBranch);
  } else {
    res.status(404).json({ message: "Branch not found" });
  }
};

// Delete Branch
export const deleteBranch = (req: Request, res: Response) => {
  const success = BranchService.deleteBranch(req.params.id);
  if (success) {
    res.json({ message: "Branch deleted" });
  } else {
    res.status(404).json({ message: "Branch not found" });
  }
};
