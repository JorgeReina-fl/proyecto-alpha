import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import styles from './RootLayout.module.css';

export default function RootLayout() {
  return (
    <div className={styles['root-layout']}>
      <Navbar />
      <main className={styles['root-layout__main']}>
        <div className={styles['root-layout__container']}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}