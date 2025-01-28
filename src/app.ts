import express from "express";
import morgan from "morgan";

const app = express();

// Use Morgan for HTTP request logging with the "combined" log format
app.use(morgan("combined"));

// Root route (optional) - responds with a message at '/'
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Health check route
app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

// Define the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
