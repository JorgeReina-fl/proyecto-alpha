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

// Mount routers\napp.use(\'/api/auth\', auth);\napp.use(\'/api/data\', data);\n\n// Serve frontend for production\nif (process.env.NODE_ENV === \'production\') {\n  // Serve static files from the React app\n  app.use(express.static(path.join(__dirname, \'..\/frontend/dist\')));\n\n  // The \"catchall\" handler: for any request that doesn\'t\n  // match one above, send back React\'s index.html file.\n  app.get(\'*\' (req, res) => {\n    res.sendFile(path.join(__dirname, \'..\/frontend/dist/index.html\'));\n  });\n} else {\n    // Fallback to index.html for single-page demo (optional)\n    app.get(\'/\', (req, res) => {\n        res.sendFile(path.join(__dirname, \'public\', \'index.html\'));\n    });\n}

module.exports = app;
