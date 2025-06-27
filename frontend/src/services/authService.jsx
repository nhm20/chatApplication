import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const simpleLogin = async (username) => {
  const response = await axios.post(`${API_URL}/auth/simple-login`, {
    username,
  });
  return response.data;
};

const register = async (credentials) => {
  console.log("Register request body:", credentials);
  const response = await axios.post(`${API_URL}/auth/register`, credentials);
  console.log("Register response:", response.data);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

const logout = async () => {
  const token = localStorage.getItem("token");
  await axios.post(
    `${API_URL}/auth/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default { register, login, logout, simpleLogin };
