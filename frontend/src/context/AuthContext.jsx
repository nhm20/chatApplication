import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token && !user) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id });
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      }
    }
  }, [token, user]);

  const simpleLogin = async (username) => {
    try {
      const response = await authService.simpleLogin(username);
      localStorage.setItem("token", response.token);
      setToken(response.token);
      setUser(response.user);
      navigate("/chat");
    } catch (error) {
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem("token", response.token);
      setToken(response.token);
      setUser(response.user);
      navigate("/chat");
    } catch (error) {
      throw error;
    }
  };

  const register = async (credentials) => {
    try {
      const response = await authService.register(credentials);
      localStorage.setItem("token", response.token);
      setToken(response.token);
      setUser(response.user);
      navigate("/chat");
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, simpleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
