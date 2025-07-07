// src/features/notifications/NotificationItem.js
import { FaBook, FaMoneyBillWave, FaUsers, FaGraduationCap } from 'react-icons/fa';

const iconMap = {
  book: <FaBook />,
  investment: <FaMoneyBillWave />,
  family: <FaUsers />,
  course: <FaGraduationCap />
};

export default function NotificationItem({ notification, onMarkRead }) {
  return (
    <div className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
      <div className="notification-icon">
        {iconMap[notification.type] || <FaBook />}
      </div>
      <div className="notification-content">
        <p>{notification.message}</p>
        <small>{new Date(notification.createdAt).toLocaleString()}</small>
      </div>
      {!notification.read && (
        <button 
          onClick={() => onMarkRead(notification.id)}
          className="mark-read-btn"
        >
          Mark as Read
        </button>
      )}
    </div>
  );
}