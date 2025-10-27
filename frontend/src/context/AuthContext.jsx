import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from './auth-context';
import { useNotification } from '../hooks/useNotification';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const { showNotification } = useNotification();

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    showNotification('Cierre de sesión exitoso', 'error');
  }, [showNotification]);

  const fetchUser = useCallback(async () => {
    if (token) {
      try {
        const response = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch user', error);
        // If token is invalid, log out the user
        logout();
      }
    }
  }, [token, logout]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('token', token);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
