import { useState, useEffect } from "react";
import { fetchProfile, updateProfile } from "../../services/api";
import { useNavigate } from "react-router-dom";

const EmployerProfileEdit = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    company_name: "",
    company_website: "",
    company_description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile().then((profile) => {
      setFormData({
        full_name: profile.full_name || "",
        company_name: profile.company_name || "",
        company_website: profile.company_website || "",
        company_description: profile.company_description || "",
      });
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
    navigate("/profile");
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold">Edit Employer Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="text"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="text"
          name="company_website"
          value={formData.company_website}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <textarea
          name="company_description"
          value={formData.company_description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EmployerProfileEdit;
