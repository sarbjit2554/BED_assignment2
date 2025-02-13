import { Router } from "express";
import * as EmployeeController from "../controllers/employee.controller";
import { validateCreateEmployee, validateUpdateEmployee } from "../middleware/validation.middleware";

const router = Router();

// Apply validation middleware to POST and PUT routes
router.post("/", validateCreateEmployee, EmployeeController.createEmployee);
router.put("/:id", validateUpdateEmployee, EmployeeController.updateEmployee);

router.get("/", EmployeeController.getAllEmployees);
router.get("/:id", EmployeeController.getEmployeeById);
router.delete("/:id", EmployeeController.deleteEmployee);
router.get("/branch/:branchId", EmployeeController.getEmployeesByBranch);
router.get("/department/:department", EmployeeController.getEmployeesByDepartment);

export default router;
