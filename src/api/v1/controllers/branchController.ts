import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchServices";
import { Branch } from "../models/branchmodels";
import { successResponse } from "../models/responsemodel";
 
// Get all branches
export const getAllBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branches: Branch[] = await branchService.fetchAllBranches();
        res.status(200).json(successResponse(branches, "Branches retrieved successfully"));
    } catch (error) {
        next(error);  
    }
};
 
// Create a new branch
export const createBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newBranch: Branch = await branchService.createBranch(req.body);
        res.status(201).json(successResponse(newBranch, "Branch created successfully"));
    } catch (error) {
        next(error);  
    }
};
 
// Get a branch by ID
export const getBranchById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branchId = req.params.id;
        const branch: Branch | undefined = await branchService.getBranchById(branchId);
 
        if (!branch) {
            res.status(404).json({ message: "Branch not found" });
            return;
        }
 
        res.status(200).json(successResponse(branch, "Branch retrieved successfully"));
    } catch (error) {
        next(error);  
    }
};
 
// Update an existing branch
export const updateBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const updatedBranch: Branch = await branchService.updateBranch(req.params.id, req.body);
        res.status(200).json(successResponse(updatedBranch, "Branch updated successfully"));
    } catch (error) {
        next(error); 
    }
};
 
// Delete a branch
export const deleteBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await branchService.deleteBranch(req.params.id);
        res.status(200).json(successResponse(null, "Branch deleted successfully"));
    } catch (error) {
        next(error);  
    }
};