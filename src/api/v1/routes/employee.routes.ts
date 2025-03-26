import { Router } from "express";
import { 
  createEmployee, 
  getAllEmployees
} from "../services/employee.service"; // Ensure correct import

const router = Router();

/**
 * @swagger
 * /employees:
 *   post:
 *     description: Create a new employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 position:
 *                   type: string
 */
router.post("/", async (req, res) => {  // Removed "/employees"
  try {
    const employee = req.body;
    const newEmployee = createEmployee(employee); 
    res.status(201).json(newEmployee);
  } catch (error: unknown) { 
    if (error instanceof Error) { 
      res.status(500).json({ message: "Failed to create employee", error: error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred", error });
    }
  }
});

/**
 * @swagger
 * /employees:
 *   get:
 *     description: Get a list of employees
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   position:
 *                     type: string
 */
router.get("/", async (req, res) => {  // Removed "/employees"
  try {
    const employees = getAllEmployees(); 
    res.status(200).json(employees);
  } catch (error: unknown) { 
    if (error instanceof Error) { 
      res.status(500).json({ message: "Failed to fetch employees", error: error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred", error });
    }
  }
});

export default router;
