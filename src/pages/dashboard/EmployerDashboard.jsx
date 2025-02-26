import DashboardNavbar from "../../components/Navbar";

const EmployerDashboard = () => {
  return (
    <div>
      <DashboardNavbar />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome, Employer!</h2>
        <p>Post jobs, view applicants, and manage your listings.</p>
      </div>
    </div>
  );
};

export default EmployerDashboard;
