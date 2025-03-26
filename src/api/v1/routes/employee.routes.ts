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
 *     description: Create a new employee with a name and position
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the employee
 *               position:
 *                 type: string
 *                 description: The position of the employee in the company
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
 *                   description: Unique identifier of the employee
 *                 name:
 *                   type: string
 *                   description: The name of the employee
 *                 position:
 *                   type: string
 *                   description: The position of the employee in the company
 *       400:
 *         description: Invalid input, employee could not be created
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req, res) => { 
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
 *     description: Retrieve a list of all employees in the system
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
 *                     description: Unique identifier of the employee
 *                   name:
 *                     type: string
 *                     description: The name of the employee
 *                   position:
 *                     type: string
 *                     description: The position of the employee in the company
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {  
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
