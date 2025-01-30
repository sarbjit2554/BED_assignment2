import { Branch } from "../interfaces/branch.interface";

// Temporary in-memory storage for branches
const branches: Branch[] = [];

// Helper function to generate a unique branch ID
const generateBranchId = (): string => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

// Create Branch
export const createBranch = (branch: Omit<Branch, "id">): Branch => {
  const newBranch: Branch = { id: generateBranchId(), ...branch };
  branches.push(newBranch);
  return newBranch;
};

// Get All Branches
export const getAllBranches = (): Branch[] => branches;

// Get Branch by ID
export const getBranchById = (id: string): Branch | undefined => {
  return branches.find(branch => branch.id === id);
};

// Update Branch
export const updateBranch = (id: string, updates: Partial<Branch>): Branch | null => {
  const index = branches.findIndex(branch => branch.id === id);
  if (index === -1) return null;

  branches[index] = { ...branches[index], ...updates };
  return branches[index];
};

// Delete Branch
export const deleteBranch = (id: string): boolean => {
  const index = branches.findIndex(branch => branch.id === id);
  if (index === -1) return false;

  branches.splice(index, 1);
  return true;
};
