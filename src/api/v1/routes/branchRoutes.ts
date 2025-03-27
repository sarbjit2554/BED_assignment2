import express, { Request, Response, NextFunction } from "express";
import {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
} from "../controllers/branchController";

import { validateRequest } from "../middleware/validate";
import {
  createBranchSchema,
  updateBranchSchema,
  deleteBranchSchema,
} from "../schemas/branchschemas";

const router = express.Router();

/**
 * @openapi
 * /api/v1/branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: "1234567890"
 *     responses:
 *       201:
 *         description: Branch created successfully
 */
router.post("/", validateRequest(createBranchSchema), async (req: Request, res: Response, next: NextFunction) => {
  await createBranch(req, res, next);  
});

/**
 * @openapi
 * /api/v1/branches:
 *   get:
 *     summary: Get all branches
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: List of all branches
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  await getAllBranches(req, res, next);  
});

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   get:
 *     summary: Get a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the branch
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Branch details
 */
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  await getBranchById(req, res, next);  
});

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   put:
 *     summary: Update a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the branch
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: "1234567890"
 *     responses:
 *       200:
 *         description: Branch updated successfully
 */
router.put("/:id", validateRequest(updateBranchSchema), async (req: Request, res: Response, next: NextFunction) => {
  await updateBranch(req, res, next);  
});

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   delete:
 *     summary: Delete a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the branch
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 */
router.delete("/:id", validateRequest(deleteBranchSchema), async (req: Request, res: Response, next: NextFunction) => {
  await deleteBranch(req, res, next); 
});

export default router;