import { useState, useEffect } from "react";
import { fetchProfile } from "../../services/api";
import { Link } from "react-router-dom";

const EmployerProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchProfile(token).then(setProfile);
  }, []);

  if (!profile) return <p>Жүктелуде...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Жұмыс берушінің профилі</h1>
      <div className="p-4 border rounded-lg mt-4">
        <p>
          <strong>Толық аты-жөні:</strong> {profile.full_name}
        </p>
        <p>
          <strong>Электрондық пошта:</strong> {profile.email}
        </p>
        <p>
          <strong>Компания атауы:</strong>{" "}
          {profile.company_name || "Көрсетілмеген"}
        </p>
        <p>
          <strong>Компания сайты:</strong>{" "}
          {profile.company_website ? (
            <a href={profile.company_website} className="text-blue-500">
              {profile.company_website}
            </a>
          ) : (
            "Көрсетілмеген"
          )}
        </p>
        <p>
          <strong>Компания сипаттамасы:</strong>{" "}
          {profile.company_description || "Көрсетілмеген"}
        </p>
      </div>
      <Link
        to="/profile/edit"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Профильді өңдеу
      </Link>
    </div>
  );
};

export default EmployerProfile;
