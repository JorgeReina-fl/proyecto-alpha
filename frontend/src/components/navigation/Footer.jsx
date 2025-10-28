import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <p className={styles.footer__text}>
          © {new Date().getFullYear()} Chat App. Todos los derechos reservados.
        </p>
        <div className={styles['footer__social-links']}>
          <a href="https://github.com/JorgeReina-fl" target="_blank" rel="noopener noreferrer" className={styles['footer__social-link']}>
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/jorgereinafl/" target="_blank" rel="noopener noreferrer" className={styles['footer__social-link']}>
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/jorgereina.fl/" target="_blank" rel="noopener noreferrer" className={styles['footer__social-link']}>
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}