// src/features/notifications/NotificationCenter.js
import { useState } from 'react';
import { useNotifications } from './useNotifications';
import NotificationItem from './NotificationItem';
import { FaBell, FaTimes } from 'react-icons/fa';

export default function NotificationCenter({ userId }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    notifications,
    unreadCount,
    markNotificationRead
  } = useNotifications(userId);

  return (
    <div className="notification-center">
      <button 
        className="notification-bell"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBell />
        {unreadCount > 0 && (
          <span className="badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h4>Arifa Zako</h4>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>
          
          <div className="notification-list">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkRead={markNotificationRead}
                />
              ))
            ) : (
              <p className="empty-notifications">Hakuna arifa mpya</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}