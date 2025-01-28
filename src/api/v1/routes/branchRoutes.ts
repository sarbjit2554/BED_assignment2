// src/api/v1/routes/branchRoutes.ts
import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

// Sample route to get branches
router.get('/', (req: Request, res: Response) => {
  res.json([
    { id: 1, name: 'Vancouver Branch' },
    { id: 2, name: 'Edmonton Branch' }
  ]);
});

export default router;
