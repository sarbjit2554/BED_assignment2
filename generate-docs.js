// generate-docs.js
const fs = require("fs");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "Comprehensive API documentation"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./src/api/v1/routes/*.ts"] 
};

const swaggerSpec = swaggerJSDoc(options);

fs.writeFileSync("./openapi.json", JSON.stringify(swaggerSpec, null, 2));
console.log(" openapi.json generated successfully!");
