import { useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';
import { SocketContext } from './socket-context';
import axios from 'axios';

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const { token } = useAuth();

  const fetchMessages = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axios.get('/api/data/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setMessages(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;

    fetchMessages();

    const socketInstance = io('http://localhost:5000', {
      auth: { token },
    });

    socketInstance.on('connect', () => {
      console.log('Connected to socket server');
    });

    socketInstance.on('users:update', (users) => {
      setOnlineUsers(users);
    });

    socketInstance.on('chat:message', (message) => {
      setMessages((prev) => [...prev, message]);
      // Remove user from typing users when they send a message
      setTypingUsers((prev) => prev.filter((u) => u.userName !== message.userName));
    });

    socketInstance.on('typing', ({ userName }) => {
      setTypingUsers((prev) => [...prev, userName]);
    });

    socketInstance.on('stop typing', ({ userName }) => {
      setTypingUsers((prev) => prev.filter((u) => u !== userName));
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [token, fetchMessages]);

  const sendMessage = (message) => {
    if (socket) {
      socket.emit('chat:message', message);
    }
  };

  const sendTyping = () => {
    if (socket) {
      socket.emit('typing');
    }
  };

  const sendStopTyping = () => {
    if (socket) {
      socket.emit('stop typing');
    }
  };

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, messages, typingUsers, sendMessage, sendTyping, sendStopTyping }}>
      {children}
    </SocketContext.Provider>
  );
};