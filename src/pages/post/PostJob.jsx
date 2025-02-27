import { useState, useEffect } from "react";
import { postJob, fetchSkills } from "../../services/api";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    job_type: "full-time",
    skills: [], // Stores skill objects { id, name }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [availableSkills, setAvailableSkills] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      fetchSkills({ search: searchTerm }).then((data) => {
        setAvailableSkills(data.results);
      });
    } else {
      setAvailableSkills([]);
    }
  }, [searchTerm]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (skill) => {
    if (!formData.skills.some((s) => s.id === skill.id)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      });
    }
  };

  const handleRemoveSkill = (skillId) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill.id !== skillId),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const jobData = {
        ...formData,
        skills: formData.skills.map((skill) => skill.id),
      };
      await postJob(jobData);
      navigate("/employer-dashboard");
    } catch (error) {
      setError("Жұмыс орнын жариялау сәтсіз аяқталды. Қайта көріңіз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Жаңа жұмыс орнын жариялау
      </h2>
      {error && <p className="text-center text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Жұмыс атауы"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border rounded shadow-md focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          placeholder="Жұмыс сипаттамасы"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded shadow-md focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="requirements"
          placeholder="Жұмыс талаптары"
          value={formData.requirements}
          onChange={handleChange}
          className="w-full p-3 border rounded shadow-md focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="salary"
          placeholder="Жалақы"
          value={formData.salary}
          onChange={handleChange}
          className="w-full p-3 border rounded shadow-md focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="location"
          placeholder="Орналасуы"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 border rounded shadow-md focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="job_type"
          value={formData.job_type}
          onChange={handleChange}
          className="w-full p-3 border rounded shadow-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="full-time">Толық жұмыс күні</option>
          <option value="part-time">Жартылай жұмыс күні</option>
          <option value="internship">Тәжірибе</option>
        </select>

        <div>
          <label className="block font-medium">Қажетті дағдылар:</label>
          <div className="flex flex-wrap gap-2">
            {formData.skills.length > 0 ? (
              formData.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center"
                >
                  {skill.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="ml-2 text-sm text-red-300 hover:text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))
            ) : (
              <p className="text-gray-500">Қосылған дағдылар жоқ</p>
            )}
          </div>
        </div>

        <div>
          <label className="block font-medium">Дағдыларды іздеу:</label>
          <input
            type="text"
            placeholder="Дағдыларды іздеңіз..."
            className="w-full p-3 border rounded shadow-md focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {availableSkills.length > 0 && (
            <ul className="bg-white border rounded mt-1 max-h-40 overflow-y-auto">
              {availableSkills.map((skill) => (
                <li
                  key={skill.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleAddSkill(skill)}
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
          disabled={loading}
        >
          {loading ? "Жариялануда..." : "Жұмыс орнын жариялау"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
