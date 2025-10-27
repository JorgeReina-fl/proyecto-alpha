import { useSocket } from '../hooks/useSocket';
import styles from './OnlineUsers.module.css';

export default function OnlineUsers() {
  const { onlineUsers } = useSocket();

  return (
    <div className={styles['online-users']}>
      <h2 className={styles['online-users__title']}>
        Usuarios en línea ({onlineUsers.length})
      </h2>
      <div className={styles['online-users__list']}>
        {onlineUsers.map((user) => (
          <div key={user.id} className={styles['online-users__user']}>
            <div className={styles['online-users__avatar']}>{user.name.charAt(0)}</div>
            <span className={styles['online-users__name']}>{user.name}</span>
            <span className={styles['online-users__status']}>online</span>
          </div>
        ))}
      </div>
    </div>
  );
}