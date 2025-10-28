const dotenv = require('dotenv');
const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const initializeSocket = require('./config/socket');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);

// Initialize Socket.IO
initializeSocket(httpServer);

const server = httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});