import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { NotificationProvider } from './context/NotificationContext';
import { router } from './router/router';
import Notification from './components/Notification';

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <SocketProvider>
          <Notification />
          <RouterProvider router={router} />
        </SocketProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;