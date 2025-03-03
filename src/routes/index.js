import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import StudentRegister from "../pages/register/StudentRegister";
import EmployerRegister from "../pages/register/EmployerRegister";
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import EmployerDashboard from "../pages/dashboard/EmployerDashboard";
import FacultyDashboard from "../pages/dashboard/FacultyDashboard";
import StudentProfile from "../pages/profile/StudentProfile";
import EmployerProfile from "../pages/profile/EmployerProfile";
import StudentProfileEdit from "../pages/profile/StudentProfileEdit";
import EmployerProfileEdit from "../pages/profile/EmployerProfileEdit";
import PostJob from "../pages/post/PostJob";
import JobDetails from "../pages/jobs/JobDetail";
import AppliedJobsList from "../pages/dashboard/AppliedJobs";
import EmployerApplications from "../pages/dashboard/ReceivedJobs";
import ManageApplications from "../pages/admin/ManageApplications";
import GoogleData from "../pages/Googledata";
import ChooseType from "../pages/profile/ChooseType";

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Routes Without Navbar */}
      {!user && (
        <>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/student" element={<StudentRegister />} />
          <Route path="/register/employer" element={<EmployerRegister />} />
          <Route path="/googledata" element={<GoogleData to="/" />} />
        </>
      )}

      {/* Protected Routes With Navbar */}
      <Route element={<Layout />}>
        {user?.user_type === "student" && (
          <>
            <Route path="/" element={<StudentDashboard />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/profile/edit" element={<StudentProfileEdit />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/applications" element={<AppliedJobsList />} />
          </>
        )}
        {user?.user_type === "employer" && (
          <>
            <Route path="/" element={<EmployerDashboard />} />
            <Route path="/profile" element={<EmployerProfile />} />
            <Route path="/profile/edit" element={<EmployerProfileEdit />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/applications" element={<EmployerApplications />} />
          </>
        )}
        {(user?.user_type === "admin" || user?.user_type === "faculty") && (
          <>
            <Route path="/" element={<FacultyDashboard />} />
            <Route path="/students" element={<EmployerDashboard />} />
            <Route path="/applications" element={<ManageApplications />} />
            <Route path="/jobs" element={<StudentDashboard />} />
          </>
        )}
        {user?.user_type == null && <Route path="/" element={<ChooseType />} />}
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
