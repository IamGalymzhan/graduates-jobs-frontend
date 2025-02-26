import { useState } from "react";
import { postJob } from "../../services/api";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    job_type: "full-time",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postJob(formData);
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
