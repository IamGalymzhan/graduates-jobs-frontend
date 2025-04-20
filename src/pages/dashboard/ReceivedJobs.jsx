import { useEffect, useState } from "react";
import {
  fetchEmployerApplications,
  updateJobApplication,
} from "../../services/api";
import Dialog from "../../components/ui/dialog";

const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("applied_at");
  const [selectedCoverLetter, setSelectedCoverLetter] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getApplications = async () => {
      try {
        const data = await fetchEmployerApplications({
          search,
          ordering: sortBy,
        });
        setApplications(data.results);
      } catch (error) {
        setError("Жұмысқа өтінімдерді жүктеу сәтсіз аяқталды");
      } finally {
        setLoading(false);
      }
    };
    getApplications();
  }, [search, sortBy]);

  const handleFeedbackClick = (application) => {
    setSelectedApplication(application);
    setFeedback(application.feedback || "");
    setShowFeedbackModal(true);
  };

  const handleSubmitFeedback = async () => {
    if (!selectedApplication) return;

    setSubmitting(true);
    try {
      const updatedApplication = await updateJobApplication(
        selectedApplication.id,
        { feedback }
      );

      // Update the application in the state
      setApplications(
        applications.map((app) =>
          app.id === selectedApplication.id ? { ...app, feedback } : app
        )
      );

      setShowFeedbackModal(false);
      setSelectedApplication(null);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Show error message
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <p className="text-center text-xl font-semibold">
        Жұмысқа өтінімдер жүктелуде...
      </p>
    );
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200 animate-fadeIn">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Жұмысқа өтінімдер
      </h2>

      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Өтінімдерді іздеу..."
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
          <option value="student_name">Үміткер аты бойынша сұрыптау</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {applications.map((app) => (
          <div
            key={app.id}
            className="p-6 border rounded-lg shadow-lg bg-gray-50 hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <h3 className="text-2xl font-bold text-gray-900">
              {app.job_title}
            </h3>
            <p className="text-md text-gray-600">
              {app.job_location} | {app.job_employer}
            </p>
            <p className="text-md text-gray-700 font-semibold">
              Үміткер: {app.student_name}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Өтінім күні: {new Date(app.applied_at).toLocaleDateString()}
            </p>
            {app.feedback && (
              <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm font-semibold text-gray-700">
                  Кері байланыс:
                </p>
                <p className="text-sm text-gray-600">{app.feedback}</p>
              </div>
            )}
            <div className="flex space-x-4 mt-3">
              <a
                href={app.resume}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Резюмені қарау
              </a>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => setSelectedCoverLetter(app.cover_letter)}
              >
                Мотивациялық хатты қарау
              </button>
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                onClick={() => handleFeedbackClick(app)}
              >
                {app.feedback ? "Кері байланысты өңдеу" : "Кері байланыс беру"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCoverLetter && (
        <Dialog onClose={() => setSelectedCoverLetter(null)}>
          <div className="p-6 bg-white shadow-xl rounded-lg max-w-lg mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Мотивациялық хат
            </h3>
            <p className="text-gray-700 text-lg whitespace-pre-line">
              {selectedCoverLetter}
            </p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              onClick={() => setSelectedCoverLetter(null)}
            >
              Жабу
            </button>
          </div>
        </Dialog>
      )}

      {showFeedbackModal && (
        <Dialog onClose={() => !submitting && setShowFeedbackModal(false)}>
          <div className="p-6 bg-white shadow-xl rounded-lg max-w-lg mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Үміткерге кері байланыс беру
            </h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2">
                Жұмыс:{" "}
                <span className="font-semibold">
                  {selectedApplication?.job_title}
                </span>
              </p>
              <p className="text-gray-700 mb-4">
                Үміткер:{" "}
                <span className="font-semibold">
                  {selectedApplication?.student_name}
                </span>
              </p>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="feedback"
              >
                Кері байланыс
              </label>
              <textarea
                id="feedback"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                placeholder="Үміткерге кері байланыс жазыңыз..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                disabled={submitting}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                onClick={() => setShowFeedbackModal(false)}
                disabled={submitting}
              >
                Болдырмау
              </button>
              <button
                className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSubmitFeedback}
                disabled={submitting}
              >
                {submitting ? "Жіберілуде..." : "Жіберу"}
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default EmployerApplications;
