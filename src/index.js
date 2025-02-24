const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');
const recordsRouter = require('./routes/records');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware
app.use(bodyParser.json());

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js API",
      version: "1.0.0",
      description: "API documentation for the Node.js application"
    },
    servers: [
      {
        url: process.env.BASE_URL || `http://localhost:${PORT}`,
        description: "Development server"
      }
    ]
  },
  apis: ['./routes/*.js']
};

// Initialize Swagger JSDoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Swagger UI Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/records', recordsRouter);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js API! Visit /api-docs for API documentation.');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running`);
  console.log(`Swagger documentation available at /api-docs`);
});
