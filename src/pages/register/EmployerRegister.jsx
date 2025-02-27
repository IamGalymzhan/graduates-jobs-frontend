import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerEmployer } from "../../services/api";

const EmployerRegister = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    company_name: "",
    company_website: "",
    company_description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerEmployer(formData);
      alert("Тіркелу сәтті аяқталды! Кіруіңізді сұраймыз.");
      navigate("/login");
    } catch (error) {
      console.error("Тіркелу сәтсіз аяқталды:", error.response?.data || error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        Жұмыс берушіні тіркеу
      </h2>
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
          name="company_name"
          placeholder="Компания атауы"
          value={formData.company_name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="url"
          name="company_website"
          placeholder="Компания сайты"
          value={formData.company_website}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <textarea
          name="company_description"
          placeholder="Компания сипаттамасы"
          value={formData.company_description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Тіркелу
        </button>
      </form>
    </div>
  );
};

export default EmployerRegister;
