import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerStudent } from "../../services/api";

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    education: "",
    status: "searching",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerStudent(formData);
      alert("Тіркелу сәтті аяқталды! Кіруіңізді сұраймыз.");
      navigate("/login");
    } catch (error) {
      console.error("Тіркелу сәтсіз аяқталды:", error.response?.data || error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Студентті тіркеу</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="full_name"
          placeholder="Толық аты-жөніңіз"
          value={formData.full_name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="email"
          name="email"
          placeholder="Электрондық пошта"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="password"
          name="password"
          placeholder="Құпия сөз"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="text"
          name="education"
          placeholder="Білімі"
          value={formData.education}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="searching">Жұмыс іздеуде</option>
          <option value="working">Жұмыс істеп жүр</option>
          <option value="internship">Тәжірибеде</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Тіркелу
        </button>
      </form>
    </div>
  );
};

export default StudentRegister;
