import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import img from "../assets/google.png";

const Login = () => {
  const { login } = useContext(AuthContext);
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };
    const success = await login(formData);
    if (success) {
      navigate("/");
      window.location.reload();
      toast.success(t("Кіру сәтті өтті"));
    } else {
      toast.error(t("Кіру сәтсіз болды"));
    }
  };

  const handleGoogleLogin = async () => {
    window.location.href =
      "http://localhost:8000/api/users/accounts/google/login/";
    console.log("Google login redirecting...");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Сол жақ бөлік: Кескін және мотивациялық мәтін */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center relative items-center justify-center text-white text-center p-6"
        style={{
          backgroundImage:
            "url('https://www.cardiff.ac.uk/__data/assets/image/0010/1191970/Graduation-2018-2018-5-29-10-3-51-566.jpeg')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-3xl font-bold">Карьера мүмкіндіктерін ашыңыз</h1>
          <p className="text-lg mt-2">
            Армандаған жұмысыңызды тапқан мыңдаған кәсіпқойларға қосылыңыз.
          </p>
        </div>
      </div>

      {/* Оң жақ бөлік: Кіру формасы */}
      <div className="flex justify-center items-center w-full md:w-1/2 p-6 bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Кіру</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              className="w-full p-3 border rounded mb-3"
              value={email}
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Құпия сөз"
              className="w-full p-3 border rounded mb-4"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
            >
              Кіру
            </button>
          </form>

          {/* 🔹 Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full mt-3 bg-red-500 text-white p-3 rounded flex items-center justify-center hover:bg-red-600 transition"
          >
            <img src={img} alt="G" className="w-5 h-5 mr-2" />
            Google арқылы кіру
          </button>

          <p className="mt-4 text-center text-sm">
            Аккаунтыңыз жоқ па?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Басты бетке өту
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
