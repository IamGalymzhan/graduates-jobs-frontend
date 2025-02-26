import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />; // ✅ Redirect if not logged in

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {user.user.user_type === "student" ? (
        <>
          <h1 className="text-3xl font-bold mb-6">
            Welcome, {user.user.full_name}
          </h1>
          <p className="text-lg">
            Check job listings and apply for your dream job!
          </p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">
            Welcome, {user.user.company_name}
          </h1>
          <p className="text-lg">Post jobs and manage applicants!</p>
        </>
      )}
    </div>
  );
};

export default Dashboard;
