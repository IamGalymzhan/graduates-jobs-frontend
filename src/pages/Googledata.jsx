import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";

const GoogleData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { googleLogin } = useContext(AuthContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    console.log("Google data page opened");
    if (!searchParams.has("token")) {
      navigate("/login");
      return;
    }
    const token = searchParams.get("token");
    const login = async () => {
      console.log("Google redirect page opened");
      const success = await googleLogin(token);
      console.log("Google login success:", success);
      navigate("/");
    };
    login();
  });

  return null;
};

export default GoogleData;
