import { useEffect, useState } from "react";
import { fetchStudents } from "../../services/api";
import DashboardNavbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const EmployerDashboard = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudentList();
  }, []);

  const fetchStudentList = async () => {
    setLoading(true);
    try {
      const data = await fetchStudents({ search });
      setStudents(data.results);
    } catch (error) {
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchStudentList();
  };

  const navigate = useNavigate();

  return (
    <div>
      <DashboardNavbar />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Find Talented Students</h2>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex space-x-4 mb-6">
          <input
            type="text"
            placeholder="Search students..."
            className="p-3 border rounded w-full md:w-2/3"
            value={search}
            onChange={handleSearch}
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded md:w-1/3 hover:bg-blue-700 transition"
          >
            Search
          </button>
          <button
            onClick={() => {navigate('/post-job')}}
            className="p-3 bg-blue-600 text-white rounded md:w-1/3 hover:bg-blue-700 transition"
          >
            Post a job
          </button>
        </form>

        {/* Student Listings */}
        {loading ? (
          <p className="text-center">Loading students...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.length > 0 ? (
              students.map((student) => (
                <div key={student.id} className="p-6 bg-white shadow-lg rounded-lg border">
                  <h3 className="text-xl font-bold">{student.full_name}</h3>
                  <p className="text-gray-600">Education: {student.education || "Not specified"}</p>
                  <p className="text-gray-600">Status: {student.status}</p>
                  {student.skills.length > 0 ? (
                    <div className="mt-2">
                      <h4 className="font-semibold">Skills:</h4>
                      <ul className="list-disc pl-5 text-gray-700">
                        {student.skills.map((skill) => (
                          <li key={skill.id}>{skill.name}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-gray-600">No skills listed</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center">No students found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
