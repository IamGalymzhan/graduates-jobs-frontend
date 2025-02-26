import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const location = useLocation();
  const hiddenRoutes = [
    "/",
    "/login",
    "/register/student",
    "/register/employer",
  ];

  return (
    <div>
      {!hiddenRoutes.includes(location.pathname) && <Navbar />}
      <Outlet /> {/* 👈 This will render the page content */}
    </div>
  );
};

export default Layout;
