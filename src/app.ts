import express from "express";
import morgan from "morgan";
import path from "path";
import healthRoute from "./api/v1/routes/health";
import employeeRoutes from "./api/v1/routes/employee.routes"; // Import employee routes

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

// Initialize express
const app = express();

// Middleware
app.use(express.json()); // Enable JSON parsing
app.use(morgan("combined"));

// Use the health route
app.use("/health", healthRoute);

// Use the employee routes
app.use("/employees", employeeRoutes);

// Define Swagger documentation options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "Employee API",
      version: "1.0.0",
      description: "API documentation for managing employee records.",
    },
    servers: [
      {
        url: "http://localhost:3000", // API base URL
      },
    ],
  },
  apis: [path.join(__dirname, "api/v1/routes/*.ts")], // Path to your API route files
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
