const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerDocument = require('../swagger.json');
const recordsRouter = require('./routes/records');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware
app.use(bodyParser.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
