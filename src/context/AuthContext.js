import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/users/login/`, { "username": username, "password": password });
      localStorage.setItem("token", response.data.access);
      setToken(response.data.access);
      setUser(jwtDecode(response.data.access));
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
