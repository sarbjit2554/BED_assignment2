import express from 'express';
import morgan from 'morgan';

const app = express();
const port = 3000;

// Middleware to log requests
app.use(morgan('dev'));

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
