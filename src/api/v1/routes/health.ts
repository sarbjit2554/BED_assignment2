import { Router, Request, Response } from 'express';

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Check the health of the server
 *     description: Returns a simple message indicating the server is healthy
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Server is healthy'
 */
const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Server is healthy' });
});

export default router;
