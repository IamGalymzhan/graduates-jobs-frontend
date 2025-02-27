import { useEffect, useState } from "react";
import { fetchAppliedJobs } from "../../services/api";

const AppliedJobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("applied_at");

  useEffect(() => {
    const getAppliedJobs = async () => {
      try {
        const data = await fetchAppliedJobs({ search, ordering: sortBy });
        setJobs(data.results);
      } catch (error) {
        setError("Өтінім берген жұмыстарды жүктеу сәтсіз аяқталды");
      } finally {
        setLoading(false);
      }
    };
    getAppliedJobs();
  }, [search, sortBy]);

  if (loading)
    return <p className="text-center text-xl font-semibold">Жүктелуде...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200 animate-fadeIn">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Менің өтінім берген жұмыстарым
      </h2>

      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Жұмыстарды іздеу..."
          className="w-2/3 p-3 border rounded shadow-md focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-3 border rounded shadow-md focus:ring-2 focus:ring-blue-500"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="applied_at">Күні бойынша сұрыптау</option>
          <option value="job_title">Жұмыс атауы бойынша сұрыптау</option>
          <option value="job_employer">Жұмыс беруші бойынша сұрыптау</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-6 border rounded-lg shadow-lg bg-gray-50 hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <h3 className="text-2xl font-bold text-gray-900">
              {job.job_title}
            </h3>
            <p className="text-md text-gray-600">
              {job.job_location} | {job.job_employer}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Өтінім берілген күн:{" "}
              {new Date(job.applied_at).toLocaleDateString()}
            </p>
            <a
              href={job.resume}
              className="block mt-3 bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Резюмені қарау
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobsList;
