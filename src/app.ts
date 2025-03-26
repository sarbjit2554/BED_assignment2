import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import healthRoute from "./api/v1/routes/health";
import employeeRoutes from "./api/v1/routes/employee.routes";
import branchRoutes from "./api/v1/routes/branchRoutes";
import { errorHandler } from "./api/v1/middleware/error.middleware";

// Import Helmet.js
import helmet from "helmet";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// CORS configuration (restrict access to specific origins)
const corsOptions = {
  origin: ["https://yourtrustedsite.com", "http://localhost:3000"], // Trusted domains
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies and authentication headers
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions)); // Enable CORS with specific domains
app.use(morgan("combined"));
app.use(helmet());  // Add Helmet for security headers

// Root route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Employee API!");
});

// Register API routes
app.use("/health", healthRoute);
app.use("/employees", employeeRoutes);
app.use("/branches", branchRoutes);

// Swagger Documentation Setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Employee API",
      version: "1.0.0",
      description: "API documentation for managing employee records.",
    },
    servers: [{ url: process.env.API_BASE_URL || "http://localhost:3000" }],
  },
  apis: [path.join(__dirname, "api/v1/routes/*.ts")],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Global Error Handling Middleware
app.use(errorHandler);

// Start the server (Only if not in test environment)
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}

export default app;
