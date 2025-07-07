// src/features/notifications/notificationService.js
import axios from 'axios';

const API_URL = 'https://your-api-url/notifications';

export const getNotifications = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

export const markAsRead = async (notificationId) => {
  await axios.patch(`${API_URL}/${notificationId}/read`);
};

export const deleteNotification = async (notificationId) => {
  await axios.delete(`${API_URL}/${notificationId}`);
};