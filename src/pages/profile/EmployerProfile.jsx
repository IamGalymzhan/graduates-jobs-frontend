import { useState, useEffect } from "react";
import { fetchProfile } from "../../services/api";
import { Link } from "react-router-dom";

const EmployerProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchProfile(token).then(setProfile);
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Employer Profile</h1>
      <div className="p-4 border rounded-lg mt-4">
        <p>
          <strong>Full Name:</strong> {profile.full_name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Company Name:</strong>{" "}
          {profile.company_name || "Not provided"}
        </p>
        <p>
          <strong>Company Website:</strong>{" "}
          {profile.company_website ? (
            <a href={profile.company_website} className="text-blue-500">
              {profile.company_website}
            </a>
          ) : (
            "Not provided"
          )}
        </p>
        <p>
          <strong>Company Description:</strong>{" "}
          {profile.company_description || "Not provided"}
        </p>
      </div>
      <Link
        to="/profile/edit"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Edit Profile
      </Link>
    </div>
  );
};

export default EmployerProfile;
