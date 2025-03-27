import express from "express";
import dotenv from "dotenv";
import helmet from "helmet"; // Import Helmet
import cors, { CorsOptions } from "cors"; // Import CORS with types
import { setupSwagger } from "./swagger";
import employeeRoutes from "./api/v1/routes/employeeroutes";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Apply Helmet security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://trusted-cdn.com"],
      },
    },
    frameguard: { action: "deny" }, // Prevent Clickjacking
    noSniff: true, // Prevent MIME sniffing
    hidePoweredBy: true, // Remove "X-Powered-By" header
  })
);

// Enable JSON Parsing for API Requests (Should be placed before routes)
app.use(express.json());

// CORS Configuration with Proper TypeScript Types
const allowedOrigins = [
  "https://yourtrusteddomain.com",
  "https://anothertrusteddomain.com",
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow to access request
    } else {
      console.error(` Blocked CORS request from origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

// Set up Swagger API Documentation
setupSwagger(app);

// Use Employee Routes
app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to BED Assignment 2 API 👋");
});
// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

// Start the Server on the Configured Port
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
  console.log(` Connected to database: ${process.env.DATABASE_URL}`);
});

export default app;

