import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          {user.user_type === "student" && "Student Dashboard"}
          {user.user_type === "employer" && "Employer Dashboard"}
          {user.user_type === "admin" && "Admin Panel"}
        </h1>
        <div className="space-x-4">
          {user.user_type === "student" && (
            <>
              <Link to="/jobs" className="hover:underline">
                Jobs
              </Link>
              <Link to="/applications" className="hover:underline">
                My Applications
              </Link>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
            </>
          )}
          {user.user_type === "employer" && (
            <>
              <Link to="/employer/jobs" className="hover:underline">
                My Jobs
              </Link>
              <Link to="/employer/applicants" className="hover:underline">
                Applicants
              </Link>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
            </>
          )}
          {user.user_type === "admin" && (
            <>
              <Link to="/admin/users" className="hover:underline">
                Manage Users
              </Link>
              <Link to="/admin/jobs" className="hover:underline">
                Manage Jobs
              </Link>
            </>
          )}
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
