const express = require('express');
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const passport = require('passport');
const { specs, swaggerUi } = require('./swagger'); 

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));

const app = express();

app.use(express.json()); 

// Configure CORS to allow requests from specified origin
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: allowedOrigin,
  credentials: true 
}));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/', require('./routes')); 

const port = process.env.PORT || 8000; 
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
