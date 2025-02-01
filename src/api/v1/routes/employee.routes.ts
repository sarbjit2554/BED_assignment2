import { Router } from "express";
import * as EmployeeController from "../controllers/employee.controller";

const router = Router();

router.post("/", EmployeeController.createEmployee);
router.get("/", EmployeeController.getAllEmployees);
router.get("/:id", EmployeeController.getEmployeeById);
router.put("/:id", EmployeeController.updateEmployee);
router.delete("/:id", EmployeeController.deleteEmployee);

router.get("/branch/:branchId", EmployeeController.getEmployeesByBranch);
router.get("/department/:department", EmployeeController.getEmployeesByDepartment);

export default router;
