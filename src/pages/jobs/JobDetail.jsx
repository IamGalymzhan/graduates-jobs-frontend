import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobDetails, applyForJob } from "../../services/api";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);
  const [applying, setApplying] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const getJob = async () => {
      try {
        const data = await fetchJobDetails(id);
        setJob(data);
      } catch (error) {
        setError("Жұмыс мәліметтерін жүктеу сәтсіз аяқталды");
      } finally {
        setLoading(false);
      }
    };
    getJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    setApplying(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("cover_letter", coverLetter);
    if (resume) formData.append("resume", resume);

    try {
      await applyForJob(id, formData);
      setSuccess("Өтініш сәтті жіберілді!");
    } catch (error) {
      setError("Өтінішті жіберу сәтсіз аяқталды. Қайталап көріңіз.");
    } finally {
      setApplying(false);
    }
  };

  if (loading)
    return (
      <p className="text-center text-xl font-semibold">
        Жұмыс мәліметтері жүктелуде...
      </p>
    );
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200 animate-fadeIn">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{job.title}</h2>
      <p className="text-lg text-gray-700 mb-4">{job.description}</p>
      <div className="mb-4">
        <h3 className="font-semibold">Талаптар:</h3>
        <p className="text-gray-700">{job.requirements}</p>
      </div>
      <p className="text-lg font-semibold text-gray-800">
        Жалақы: {job.salary}
      </p>
      <p className="text-lg text-gray-700">Орналасқан жері: {job.location}</p>
      <p className="text-lg text-gray-700">Түрі: {job.job_type}</p>

      {/* Өтініш беру формасы */}
      <div className="mt-8 p-6 bg-gray-50 border rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Осы жұмысқа өтініш беру</h3>
        {success && <p className="text-green-600 text-lg">{success}</p>}
        {error && <p className="text-red-600 text-lg">{error}</p>}
        <form onSubmit={handleApply} className="space-y-4">
          <textarea
            className="w-full p-3 border rounded shadow-md focus:ring-2 focus:ring-blue-500"
            placeholder="Мотивациялық хатыңызды осында жазыңыз..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
          />
          <input
            type="file"
            className="w-full p-3 border rounded shadow-md focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setResume(e.target.files[0])}
            accept=".pdf,.doc,.docx"
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
            disabled={applying}
          >
            {applying ? "Жіберілуде..." : "Қазір өтініш беру"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobDetails;
