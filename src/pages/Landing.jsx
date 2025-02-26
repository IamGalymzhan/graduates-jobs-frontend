import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Job Portal</h1>
      <p className="text-lg mb-4">Find jobs or hire top talent.</p>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </Link>
        <Link
          to="/register/student"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Register as Student
        </Link>
        <Link
          to="/register/employer"
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Register as Employer
        </Link>
      </div>
    </div>
  );
};

export default Landing;
