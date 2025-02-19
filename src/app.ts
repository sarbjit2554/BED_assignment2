import express, { Request, Response, NextFunction } from "express"; // Import types from express
import morgan from "morgan";
import path from "path";
import healthRoute from "./api/v1/routes/health";
import employeeRoutes from "./api/v1/routes/employee.routes";
import branchRoutes from "./api/v1/routes/branchRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("combined"));

// Define a root route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Employee API!");
});

// Use the health route
app.use("/health", healthRoute);

// Use the employee routes
app.use("/employees", employeeRoutes);

// Use the branch routes
app.use("/branches", branchRoutes);

// Define Swagger documentation options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Employee API",
      version: "1.0.0",
      description: "API documentation for managing employee records.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [path.join(__dirname, "api/v1/routes/*.ts")],
};

// Set up Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Error handling middleware (global)
app.use(
  (err: any, req: Request, res: Response, next: NextFunction): void => { // Explicit types for params
    console.error(err.stack); // For logging errors

    const statusCode = err.status || 500; // Default to 500 if no status is set
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({ message });
  }
);

// Only start the server if we're not in a test environment
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
