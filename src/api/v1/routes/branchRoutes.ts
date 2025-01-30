import express from 'express';
import { Request, Response } from 'express';
import * as BranchService from '../services/branch.service'; // Importing the service

const router = express.Router();

// Create a new branch
router.post('/', (req: Request, res: Response) => {
  const { name, address, phone } = req.body;

  // Validation or other logic can go here

  const newBranch = BranchService.createBranch({ name, address, phone });
  res.status(201).json(newBranch);
});

// Get all branches
router.get('/', (req: Request, res: Response) => {
  const branches = BranchService.getAllBranches();
  res.json(branches);
});

// Get a branch by ID
router.get('/:id', (req: Request, res: Response) => {
  const branch = BranchService.getBranchById(req.params.id);
  
  if (branch) {
    res.json(branch);
  } else {
    res.status(404).json({ message: 'Branch not found' });
  }
});

// Update a branch by ID
router.put('/:id', (req: Request, res: Response) => {
  const updates = req.body;
  const updatedBranch = BranchService.updateBranch(req.params.id, updates);
  
  if (updatedBranch) {
    res.json(updatedBranch);
  } else {
    res.status(404).json({ message: 'Branch not found' });
  }
});

// Delete a branch by ID
router.delete('/:id', (req: Request, res: Response) => {
  const success = BranchService.deleteBranch(req.params.id);
  
  if (success) {
    res.json({ message: 'Branch deleted successfully' });
  } else {
    res.status(404).json({ message: 'Branch not found' });
  }
});

export default router;
