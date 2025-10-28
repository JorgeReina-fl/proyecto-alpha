import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useSocket } from '../hooks/useSocket';
import OnlineUsers from '../components/OnlineUsers';
import OfflineUsers from '../components/OfflineUsers';
import Chat from '../components/Chat';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const [allUsers, setAllUsers] = useState([]);
  const { token } = useAuth();
  const { onlineUsers } = useSocket();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/data/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setAllUsers(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  const onlineUserIds = new Set(onlineUsers.map(user => user.id));
  const offlineUsers = allUsers.filter(user => !onlineUserIds.has(user._id));

  return (
    <div className={styles['dashboard-page']}>
      <h1 className={styles['dashboard-page__title']}>Chat en tiempo real</h1>

      <div className={styles['dashboard-page__grid']}>
        <div className={`${styles['dashboard-page__grid-item']} ${styles['dashboard-page__grid-item--chat']}`}>
          <div className={styles['dashboard-page__card']}>
            <Chat />
          </div>
        </div>
        <div className={`${styles['dashboard-page__grid-item']} ${styles['dashboard-page__grid-item--users']}`}>
          <div className={styles['dashboard-page__card']}>
            <OnlineUsers />
          </div>
          <div className={`${styles['dashboard-page__card']} ${styles['dashboard-page__card--offline']}`}>
            <OfflineUsers users={offlineUsers} />
          </div>
        </div>
      </div>
    </div>
  );
}
