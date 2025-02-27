import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          {user.user_type === "student" && "Студенттік панель"}
          {user.user_type === "employer" && "Жұмыс беруші панелі"}
          {(user.user_type === "admin" || user.user_type === "faculty") &&
            "Әкімшілік панелі"}
        </h1>
        <div className="space-x-4">
          {user.user_type === "student" && (
            <>
              <Link to="/jobs" className="hover:underline">
                Жұмыстар
              </Link>
              <Link to="/applications" className="hover:underline">
                Менің өтінімдерім
              </Link>
              <Link to="/profile" className="hover:underline">
                Профиль
              </Link>
            </>
          )}
          {user.user_type === "employer" && (
            <>
              <Link to="/employer/jobs" className="hover:underline">
                Менің жұмыстарым
              </Link>
              <Link to="/applications" className="hover:underline">
                Үміткерлер
              </Link>
              <Link to="/profile" className="hover:underline">
                Профиль
              </Link>
            </>
          )}
          {(user.user_type === "admin" || user.user_type === "faculty") && (
            <>
              <Link to="/students" className="hover:underline">
                Студенттерді басқару
              </Link>
              <Link to="/applications" className="hover:underline">
                Өтінімдерді басқару
              </Link>
              <Link to="/jobs" className="hover:underline">
                Жұмыстарды басқару
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
            Шығу
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
