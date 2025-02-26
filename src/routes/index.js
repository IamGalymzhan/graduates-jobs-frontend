import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import StudentRegister from "../pages/register/StudentRegister";
import EmployerRegister from "../pages/register/EmployerRegister";
import Login from "../pages/Login";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Default path */}
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Landing />}
      />
      <Route path="/register/student" element={<StudentRegister />} />
      <Route path="/register/employer" element={<EmployerRegister />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default AppRoutes;
