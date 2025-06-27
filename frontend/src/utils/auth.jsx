import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Adjust the URL as needed

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const isLoggedIn = () => {
  const user = getCurrentUser();
  return user && user.token ? true : false;
};