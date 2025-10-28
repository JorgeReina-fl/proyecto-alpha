import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import axios from 'axios';
import styles from './LoginPage.module.css'; // Reusing styles from LoginPage

export default function RegisterPage() {
  const [name, setName] = useState('');
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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      if (response.data.success && response.data.token) {
        login(response.data.user, response.data.token);
        showNotification('Registro exitoso');
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
        <h1 className={styles['login-page__title']}>Registro</h1>
        <form onSubmit={handleSubmit} className={styles['login-page__form']}>
          <div className={styles['login-page__form-group']}>
            <label className={styles['login-page__label']}>Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles['login-page__input']}
              required
            />
          </div>
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
            {isLoading ? 'Cargando...' : 'Registrarse'}
          </button>
        </form>
        <p className={styles['login-page__text']}>
          ¿Ya tienes cuenta?{' '}
          <button
            className={styles['login-page__link']}
            onClick={() => navigate('/login')}
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
}
