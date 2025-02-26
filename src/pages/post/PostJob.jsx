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

  // Fetch skills only when there's a search term
  useEffect(() => {
    if (searchTerm) {
      fetchSkills({ search: searchTerm }).then((data) => {
        setAvailableSkills(data.results);
      });
    } else {
      setAvailableSkills([]);
    }
  }, [searchTerm]);

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add skill to list (prevent duplicates)
  const handleAddSkill = (skill) => {
    if (!formData.skills.some((s) => s.id === skill.id)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill], // Keeps existing skills
      });
    }
  };

  // Remove skill when clicking the "✕" button
  const handleRemoveSkill = (skillId) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill.id !== skillId),
    });
  };

  // Submit job post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const jobData = {
        ...formData,
        skills: formData.skills.map((skill) => skill.id), // Send only IDs
      };
      await postJob(jobData);
      navigate("/employer-dashboard");
    } catch (error) {
      setError("Failed to post job. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Post a New Job</h2>
      {error && <p className="text-center text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border rounded shadow-md focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded shadow-md focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="requirements"
          placeholder="Job Requirements"
          value={formData.requirements}
          onChange={handleChange}
          className="w-full p-3 border rounded shadow-md focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full p-3 border rounded shadow-md focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
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
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="internship">Internship</option>
        </select>

        {/* Required Skills Section */}
        <div>
          <label className="block font-medium">Required Skills:</label>
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
              <p className="text-gray-500">No skills added</p>
            )}
          </div>
        </div>

        {/* Skill Search & Add */}
        <div>
          <label className="block font-medium">Search Skills:</label>
          <input
            type="text"
            placeholder="Type to search skills..."
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
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
