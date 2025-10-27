import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import axios from 'axios';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      if (response.data.success && response.data.token) {
        login(response.data.user, response.data.token);
        showNotification('Login exitoso');
        navigate('/dashboard');
      }
    } catch (error) {
      showNotification(error.response?.data?.error || 'Error desconocido', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles['login-page']}>
      <div className={styles['login-page__container']}>
        <h1 className={styles['login-page__title']}>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className={styles['login-page__form']}>
          <div className={styles['login-page__form-group']}>
            <label className={styles['login-page__label']}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles['login-page__input']}
              required
            />
          </div>
          <div className={styles['login-page__form-group']}>
            <label className={styles['login-page__label']}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles['login-page__input']}
              required
            />
          </div>
          <button
            type="submit"
            className={styles['login-page__button']}
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
        <p className={styles['login-page__text']}>
          ¿No tienes cuenta?{' '}
          <button
            className={styles['login-page__link']}
            onClick={() => navigate('/register')}
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}
