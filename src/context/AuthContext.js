import { createContext, useState, useEffect } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken) {
      console.log(accessToken);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        console.log(JSON.parse(storedUser));
        setUser(JSON.parse(storedUser));
        navigate('/');
      }
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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
