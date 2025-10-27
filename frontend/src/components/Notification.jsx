import { useNotification } from '../hooks/useNotification';
import styles from './Notification.module.css';

export default function Notification() {
  const { notification, hideNotification } = useNotification();

  if (!notification) {
    return null;
  }

  return (
    <div className={`${styles.notification} ${styles[`notification--${notification.type}`]}`} onClick={hideNotification}>
      <p className={styles.notification__message}>{notification.message}</p>
    </div>
  );
}