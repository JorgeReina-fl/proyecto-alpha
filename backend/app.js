const express = require('express');
const path = require('path');
const cors = require('cors');

// Route files
const auth = require('./routes/authRoutes');
const data = require('./routes/dataRoutes');

// Create express app (DB connection is handled by server.js so tests can import app without opening DB connections)
const app = express();

// Middlewares
app.use(cors());
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
