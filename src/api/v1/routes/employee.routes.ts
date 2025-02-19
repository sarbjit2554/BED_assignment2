import { Router } from "express";
import { 
  createEmployee, 
  getAllEmployees, 
  getEmployeeById, 
  updateEmployee, 
  deleteEmployee, 
  getEmployeesByBranch, 
  getEmployeesByDepartment
} from "../services/employee.service"; // Correct import for named exports

const router = Router();

// Example routes
router.post("/employees", async (req, res) => {
  try {
    const employee = req.body;
    const newEmployee = createEmployee(employee); // Call service function
    res.status(201).json(newEmployee);
  } catch (error: unknown) { // Explicitly type error as unknown
    if (error instanceof Error) { // Check if it's an instance of Error
      res.status(500).json({ message: "Failed to create employee", error: error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred", error });
    }
  }
});

router.get("/employees", async (req, res) => {
  try {
    const employees = getAllEmployees(); // Call service function
    res.status(200).json(employees);
  } catch (error: unknown) { // Explicitly type error as unknown
    if (error instanceof Error) { // Check if it's an instance of Error
      res.status(500).json({ message: "Failed to fetch employees", error: error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred", error });
    }
  }
});

// Other routes here...

export default router;
