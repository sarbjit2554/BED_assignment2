import { Router } from "express";
import { 
  createEmployee, 
  getAllEmployees
} from "../services/employee.service"; // Ensure correct import

const router = Router();

// POST /employees
router.post("/", async (req, res) => {  //  Removed "/employees"
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

// GET /employees
router.get("/", async (req, res) => {  //  Removed "/employees"
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
