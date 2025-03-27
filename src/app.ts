import express from 'express';
import branchRoutes from "./api/v1/routes/branchRoutes";
import employeeRoutes from "./api/v1/routes/employeeroutes";

const app = express();

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ message: "Server is healthy" });  
});



export default app;
