import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeesByBranch,
  getEmployeesByDepartment,
} from "../controllers/employeeController";
import { validateRequest } from "../middleware/validate";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  deleteEmployeeSchema,
} from "../schemas/employeeschemas";

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           example: "emp123"
 *         name:
 *           type: string
 *           example: "Shubh Rapper"
 *         position:
 *           type: string
 *           example: "Software Engineer"
 *         department:
 *           type: string
 *           example: "Engineering"
 *         email:
 *           type: string
 *           example: "shubh.rapper@example.com"
 *         phone:
 *           type: string
 *           example: "1234567890"
 *         branchId:
 *           type: string
 *           example: "branch123"
 */

/**
 * @openapi
 * /api/v1/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Bad request due to validation error
 */
router.post("/", validateRequest(createEmployeeSchema), createEmployee);

/**
 * @openapi
 * /api/v1/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/", getAllEmployees);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 */
router.get("/:id", getEmployeeById);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Employee not found
 */
router.put("/:id", validateRequest(updateEmployeeSchema), updateEmployee);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 */
router.delete("/:id", validateRequest(deleteEmployeeSchema), deleteEmployee);

/**
 * @openapi
 * /api/v1/employees/branch/{branchId}:
 *   get:
 *     summary: Get employees by branch ID
 *     tags: [Employees]
 *     parameters:
 *       - name: branchId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of employees in the specified branch
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/branch/:branchId", getEmployeesByBranch);

/**
 * @openapi
 * /api/v1/employees/department/{department}:
 *   get:
 *     summary: Get employees by department
 *     tags: [Employees]
 *     parameters:
 *       - name: department
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of employees in the specified department
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/department/:department", getEmployeesByDepartment);

export default router;
