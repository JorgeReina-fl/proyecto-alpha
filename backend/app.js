const express = require('express');
const path = require('path');
const cors = require('cors');

// Route files
const auth = require('./routes/authRoutes');
const data = require('./routes/dataRoutes');

// Create express app (DB connection is handled by server.js so tests can import app without opening DB connections)
const app = express();

// Middlewares
// Lee la URL del frontend desde las variables de entorno
// Proporciona un valor por defecto para el desarrollo local
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Configura CORS
const corsOptions = {
  origin: FRONTEND_URL,
  optionsSuccessStatus: 200
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Serve static demo files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/auth', auth);
app.use('/api/data', data);

// Fallback to index.html for single-page demo (optional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
