import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <a href="https://jorgereina.onrender.com/" className={styles['navbar__logo-link']} target="_blank" rel="noopener noreferrer">
          <div className={styles.navbar__logo}>
            <img src="/logo.png" alt="Logo" className={styles['navbar__logo-img']} />
            <span className={styles['navbar__logo-text']}>Chat App</span>
          </div>
        </a>

        <div className={styles['navbar__hamburger']} onClick={toggleMenu}>
          <div className={styles['hamburger-line']}></div>
          <div className={styles['hamburger-line']}></div>
          <div className={styles['hamburger-line']}></div>
        </div>

        <div className={`${styles.navbar__links} ${isMenuOpen ? styles.open : ''}`}>
          {user ? (
            <button onClick={logout} className={`${styles.navbar__button} ${styles['navbar__button--logout']}`}>
              Cerrar Sesión
            </button>
          ) : (
            <>
              <RouterLink to="/login" className={`${styles.navbar__button} ${styles['navbar__button--ghost']}`}>
                Iniciar Sesión
              </RouterLink>
              <RouterLink to="/register" className={`${styles.navbar__button} ${styles['navbar__button--primary']}`}>
                Registrarse
              </RouterLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}