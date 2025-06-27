import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getUsers = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/chat/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getMessages = async (receiverId) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/chat/messages/${receiverId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const markAsRead = async (senderId) => {
  const token = localStorage.getItem("token");
  await axios.put(
    `${API_URL}/chat/messages/read/${senderId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default { getUsers, getMessages, markAsRead };
