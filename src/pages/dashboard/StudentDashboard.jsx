import DashboardNavbar from "../../components/Navbar";

const StudentDashboard = () => {
  return (
    <div>
      <DashboardNavbar />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome, Student!</h2>
        <p>Find jobs, apply, and track your applications.</p>
      </div>
    </div>
  );
};

export default StudentDashboard;
