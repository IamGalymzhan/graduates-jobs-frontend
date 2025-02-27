import { useEffect, useState } from "react";
import { fetchFacultyStats } from "../../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import MapComponent from "../../components/MapComponent";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const FacultyDashboard = () => {
  const STATUS_TRANSLATIONS = {
    searching: "Жұмыс іздеуде",
    working: "Жұмыс істеп жатыр",
    internship: "Тәжірибеде",
  };
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchFacultyStats().then(setStats).catch(console.error);
  }, []);

  if (!stats) return <p>Статистика жүктелуде...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Факультет бақылау тақтасы</h1>

      {/* Жалпы статистика */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 border rounded-lg bg-blue-100">
          <h2 className="text-xl font-semibold">Жалпы студенттер</h2>
          <p className="text-3xl">{stats.total_students}</p>
        </div>
        <div className="p-4 border rounded-lg bg-green-100">
          <h2 className="text-xl font-semibold">Жалпы жұмыс берушілер</h2>
          <p className="text-3xl">{stats.total_employers}</p>
        </div>
        <div className="p-4 border rounded-lg bg-yellow-100">
          <h2 className="text-xl font-semibold">Жалпы жұмыс орындары</h2>
          <p className="text-3xl">{stats.total_jobs}</p>
        </div>
      </div>

      {/* Пайдаланушы өсу диаграммасы */}
      <h2 className="text-xl font-bold mt-6">Пайдаланушы өсуі</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={stats.student_growth}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#0088FE"
            name="Студенттер"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Ең қажетті дағдылар бағандық диаграммасы */}
      <h2 className="text-xl font-bold mt-6">Ең қажетті дағдылар</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stats.most_needed_skills}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="skills__name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#00C49F" />
        </BarChart>
      </ResponsiveContainer>

      {/* Студенттердің жағдайы бойынша үлестірім диаграммасы */}
      <h2 className="text-xl font-bold mt-6">Студенттердің жағдайы</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={stats.student_statuses.map(({ status, count }) => ({
              name: STATUS_TRANSLATIONS[status] || status, // ✅ Translate status names
              count,
            }))}
            dataKey="count"
            cx="50%"
            cy="50%"
            outerRadius={100}
          >
            {stats.student_statuses.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Карта */}
      <h2 className="text-xl font-bold mt-6">Студенттердің картасы</h2>
      <MapComponent />
    </div>
  );
};

export default FacultyDashboard;
