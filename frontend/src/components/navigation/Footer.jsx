import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <p className={styles.footer__text}>
          © {new Date().getFullYear()} Chat App. Todos los derechos reservados.
        </p>
        <div className={styles['footer__social-links']}>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className={styles['footer__social-link']}>
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className={styles['footer__social-link']}>
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className={styles['footer__social-link']}>
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}