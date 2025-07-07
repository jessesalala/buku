// src/features/notifications/useNotifications.js
import { useState, useEffect } from 'react';
import { getNotifications, markAsRead } from './notificationService';

export function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshNotifications = async () => {
    const data = await getNotifications(userId);
    setNotifications(data);
    setUnreadCount(data.filter(n => !n.read).length);
  };

  const markNotificationRead = async (id) => {
    await markAsRead(id);
    refreshNotifications();
  };

  useEffect(() => {
    refreshNotifications();
    
    // Poll for new notifications every 5 minutes
    const interval = setInterval(refreshNotifications, 300000);
    return () => clearInterval(interval);
  }, [userId]);

  return {
    notifications,
    unreadCount,
    refreshNotifications,
    markNotificationRead
  };
}