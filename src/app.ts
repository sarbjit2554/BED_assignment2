import express from "express";
import morgan from "morgan";
import path from "path";
import healthRoute from "./api/v1/routes/health";
import employeeRoutes from "./api/v1/routes/employee.routes";
import branchRoutes from "./api/v1/routes/branchRoutes";
import swaggerUi from "swagger-ui-express"; // Changed to import
import swaggerJSDoc from "swagger-jsdoc"; // Changed to import

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("combined"));

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

// Only start the server if we're not in a test environment
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
