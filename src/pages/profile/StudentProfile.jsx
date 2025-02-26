import { useState, useEffect } from "react";
import { fetchProfile } from "../../services/api";
import { Link } from "react-router-dom";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile().then(setProfile);
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Student Profile</h1>
      <div className="p-4 border rounded-lg mt-4">
        <p>
          <strong>Full Name:</strong> {profile.full_name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Education:</strong> {profile.education || "Not provided"}
        </p>
        <p>
          <strong>Skills:</strong>{" "}
          {profile.skills?.join(", ") || "Not provided"}
        </p>
        <p>
          <strong>Status:</strong> {profile.status}
        </p>
        <p>
          <strong>Resume:</strong>{" "}
          {profile.resume ? (
            <a href={profile.resume} className="text-blue-500">
              Download
            </a>
          ) : (
            "Not uploaded"
          )}
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

export default StudentProfile;
