import styles from './OfflineUsers.module.css';

export default function OfflineUsers({ users }) {
  return (
    <div className={styles['offline-users']}>
      <h2 className={styles['offline-users__title']}>
        Usuarios desconectados ({users.length})
      </h2>
      <div className={styles['offline-users__list']}>
        {users.map((user) => (
          <div key={user._id} className={styles['offline-users__user']}>
            <div className={styles['offline-users__avatar']}>{user.name.charAt(0)}</div>
            <span className={styles['offline-users__name']}>{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
