import { createContext, useState, useEffect } from "react";
import { loginUser } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (formData) => {
    try {
      const response = await loginUser(formData);
      setUser(response.data);
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return true;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
