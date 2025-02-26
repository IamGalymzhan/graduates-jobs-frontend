import { useEffect, useState } from "react";
import { getJobs } from "../../services/api";
import DashboardNavbar from "../../components/Navbar";

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

  return (
    <div>
      <DashboardNavbar />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Find Your Dream Job</h2>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search jobs..."
            className="p-3 border rounded w-full md:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-3 border rounded w-full md:w-1/4"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="internship">Internship</option>
          </select>
          <input
            type="text"
            placeholder="Location"
            className="p-3 border rounded w-full md:w-1/4"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className="p-3 bg-blue-600 text-white rounded w-full md:w-1/6">Search</button>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id} className="p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="text-gray-600">{job.description}</p>
                <p className="mt-2 text-sm text-gray-500">{job.requirements}</p>
                <p className="mt-2 font-semibold">{job.salary}</p>
                <p className="mt-2 text-blue-600">{job.location}</p>
                <button className="mt-4 bg-green-500 text-white p-2 rounded w-full">Apply</button>
              </div>
            ))
          ) : (
            <p>No jobs found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;