import { useEffect, useState } from "react";
import { getJobs } from "../../services/api";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("all");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      const jobResults = await getJobs({ search, jobType, location });
      setJobs(jobResults);
    };
    fetchJobs();
  }, [search, jobType, location]);

  const navigate = useNavigate();
  return (
    <div>
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">
          Армандаған жұмысыңызды табыңыз
        </h2>

        {/* Фильтрлер */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Жұмыстарды іздеу..."
            className="p-3 border rounded w-full md:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-3 border rounded w-full md:w-1/4"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="all">Барлық түрлері</option>
            <option value="full-time">Толық жұмыс күні</option>
            <option value="part-time">Жартылай жұмыс күні</option>
            <option value="internship">Тәжірибе</option>
          </select>
          <input
            type="text"
            placeholder="Орналасқан жері"
            className="p-3 border rounded w-full md:w-1/4"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className="p-3 bg-blue-600 text-white rounded w-full md:w-1/6">
            Іздеу
          </button>
        </div>

        {/* Жұмыс карталары */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id} className="p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="text-gray-600">{job.description}</p>
                <p className="mt-2 text-sm text-gray-500">{job.requirements}</p>
                <p className="mt-2 font-semibold">{job.salary}</p>
                <p className="mt-2 text-blue-600">{job.location}</p>
                <div className="flex flex-col gap-2">
                  <label className="block font-medium">Қажетті дағдылар:</label>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.length > 0 ? (
                      job.skills.map((skill) => (
                        <span
                          key={skill.id}
                          className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center"
                        >
                          {skill.name}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        Қажетті дағдылар көрсетілмеген
                      </p>
                    )}
                  </div>
                </div>

                <button
                  className="mt-4 bg-green-500 text-white p-2 rounded w-full"
                  onClick={() => navigate(`/job/${job.id}`)}
                >
                  Өтініш беру
                </button>
              </div>
            ))
          ) : (
            <p>Жұмыстар табылмады</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
