import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import swaggerUi from "swagger-ui-express";
import jsYaml from "js-yaml"; // Import js-yaml to read YAML file
import fs from "fs"; // To read the YAML file

// Import Routes
import healthRoute from "./api/v1/routes/health";
import employeeRoutes from "./api/v1/routes/employee.routes";
import branchRoutes from "./api/v1/routes/branchRoutes";
import { errorHandler } from "./api/v1/middleware/error.middleware";

// Initialize Express app
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());
app.use(morgan("combined"));
app.use(cors()); // Enable CORS

// Load Swagger documentation from YAML file
const swaggerFilePath = path.join(__dirname, '../swagger.yaml');
console.log('Swagger YAML Path:', swaggerFilePath);

if (fs.existsSync(swaggerFilePath)) {
  console.log('swagger.yaml file found');
  const swaggerDocument = jsYaml.load(fs.readFileSync(swaggerFilePath, 'utf8')) as Record<string, unknown>;

  // Swagger Documentation Setup
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  console.error('swagger.yaml file not found');
}

// Register API routes
app.use("/health", healthRoute);
app.use("/employees", employeeRoutes);
app.use("/branches", branchRoutes);

// Global Error Handling Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

export default app;
