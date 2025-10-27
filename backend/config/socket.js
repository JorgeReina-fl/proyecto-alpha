const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');

// Almacena usuarios conectados: { userId: { id, name, socketId } }
const connectedUsers = new Map();

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // URL del frontend en desarrollo
      methods: ["GET", "POST"]
    }
  });

  // Middleware para autenticar conexiones
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return next(new Error('User not found'));
      }

      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.user._id.toString();
    
    // Añadir usuario a la lista de conectados
    connectedUsers.set(userId, {
      id: userId,
      name: socket.user.name,
      socketId: socket.id
    });

    // Emitir lista actualizada de usuarios
    io.emit('users:update', Array.from(connectedUsers.values()));

    // Manejar mensajes de chat
    socket.on('chat:message', async (message) => {
      try {
        // Guardar mensaje en la base de datos
        const newMessage = new Message({
          text: message,
          user: socket.user._id,
        });
        await newMessage.save();

        // Emitir mensaje a todos los clientes
        io.emit('chat:message', {
          _id: newMessage._id,
          userId: socket.user._id,
          userName: socket.user.name,
          message,
          timestamp: newMessage.createdAt // Usar el timestamp del servidor
        });
      } catch (error) {
        console.error('Error al guardar el mensaje:', error);
        // Opcional: emitir un error al cliente
        socket.emit('chat:error', 'No se pudo enviar el mensaje.');
      }
    });

    // Manejar eventos de escritura
    socket.on('typing', () => {
      socket.broadcast.emit('typing', { userName: socket.user.name });
    });

    socket.on('stop typing', () => {
      socket.broadcast.emit('stop typing', { userName: socket.user.name });
    });

    // Manejar desconexión
    socket.on('disconnect', () => {
      connectedUsers.delete(userId);
      io.emit('users:update', Array.from(connectedUsers.values()));
    });
  });

  return io;
}

module.exports = initializeSocket;