import axios from "axios";

const NOTIFICATION_API_URL = "http://localhost:23077/api/notifications";

export const getNotifications = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(NOTIFICATION_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${NOTIFICATION_API_URL}/read/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return null;
  }
};