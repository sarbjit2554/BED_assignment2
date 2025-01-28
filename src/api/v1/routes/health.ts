import { Router } from "express";

// Create a router for the health endpoint
const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     description: Get the health status of the server
 *     responses:
 *       200:
 *         description: Server is healthy
 */
router.get("/", (req, res) => {
  res.send("Server is healthy");
});

export default router;
