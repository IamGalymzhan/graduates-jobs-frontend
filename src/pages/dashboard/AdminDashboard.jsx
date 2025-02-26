import DashboardNavbar from "../../components/Navbar";

const AdminDashboard = () => {
  return (
    <div>
      <DashboardNavbar />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <p>Manage users, job postings, and oversee the platform.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
