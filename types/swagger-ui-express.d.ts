import express from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import swaggerDocument from './swagger.yaml'; // Ensure this path is correct

const app = express();

// Serve Swagger UI documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
