import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };
    const success = await login(formData);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left side: Image with Motivational Text */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center relative items-center justify-center text-white text-center p-6"
        style={{ backgroundImage: "url('https://www.cardiff.ac.uk/__data/assets/image/0010/1191970/Graduation-2018-2018-5-29-10-3-51-566.jpeg')" }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-3xl font-bold">Unlock Your Career Potential</h1>
          <p className="text-lg mt-2">Join thousands of professionals finding their dream jobs today.</p>
        </div>
      </div>

      {/* Right side: Login form */}
      <div className="flex justify-center items-center w-full md:w-1/2 p-6 bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
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
              placeholder="Password"
              className="w-full p-3 border rounded mb-4"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            Don't have an account? 
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Go to Homepage
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;