const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const recordsRouter = require('./routes/records');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Swagger Configuration
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Records API',
      version: '1.0.0',
      description: 'A simple API for managing records',
    },
  },
  apis: [path.join(__dirname, './routes/records.js')],
};

const specs = swaggerJsdoc(options);

// Routes
app.use('/records', recordsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js API! Visit /api-docs for API documentation.');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger documentation available at /api-docs`);
});