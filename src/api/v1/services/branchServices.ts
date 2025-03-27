import { Branch } from "../models/branchmodels";
import {
  createDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
} from "../repository/firebaseRepository";
 
const COLLECTION = "branches";
 
// Fetch all branches
export const fetchAllBranches = async (): Promise<Branch[]> => {
  const snapshot = await getDocuments(COLLECTION);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return { id: doc.id, ...data } as Branch;
  });
};
 
// Create a new branch
export const createBranch = async (branch: Partial<Branch>): Promise<Branch> => {
  const id = await createDocument(COLLECTION, branch);
  return { id, ...branch } as Branch;
};
 
// Fetch branch by ID
export const getBranchById = async (id: string): Promise<Branch | undefined> => {
  const branches = await fetchAllBranches();
  return branches.find((branch) => branch.id === id);
};
 
// Update an existing branch
export const updateBranch = async (
  id: string,
  branch: Partial<Branch>
): Promise<Branch> => {
  await updateDocument(COLLECTION, id, branch);
  return { id, ...branch } as Branch;
};
 
// Delete a branch
export const deleteBranch = async (id: string): Promise<void> => {
  await deleteDocument(COLLECTION, id);
};