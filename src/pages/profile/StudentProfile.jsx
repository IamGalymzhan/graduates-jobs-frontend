import { useEffect, useState } from "react";
import { getUserProfile } from "../../services/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (error) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="flex items-center space-x-4 mb-4">
        {profile.profile_picture ? (
          <img src={profile.profile_picture} alt="Profile" className="w-16 h-16 rounded-full" />
        ) : (
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">N/A</div>
        )}
        <div>
          <p className="text-xl font-semibold">{profile.full_name}</p>
          <p className="text-sm text-gray-600">Status: {profile.status}</p>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Education</h3>
        <p className="text-gray-700">{profile.education || "Not provided"}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Skills</h3>
        {profile.skills.length > 0 ? (
          <ul className="list-disc pl-5 text-gray-700">
            {profile.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No skills added</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
