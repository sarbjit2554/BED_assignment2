import express from "express";
import morgan from "morgan";

import path from "path";
import healthRoute from "./api/v1/routes/health";

// src/app.ts

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


// Initialize express
const app = express();

// Set up morgan for HTTP request logging
app.use(morgan("combined"));

// Use the health route
app.use("/health", healthRoute);
// Define Swagger documentation options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "My API",
      version: "1.0.0",
      description: "This is the API documentation for the Express server.",
    },
    servers: [
      {
        url: "http://localhost:3000", // URL of the API
      },
    ],
  },
  apis: [path.join(__dirname, "api/v1/routes/*.ts")], // Path to your API route files
};

// Set up Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
