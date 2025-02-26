import { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../../services/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ full_name: "", education: "", status: "searching", skills: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
        setFormData({
          full_name: data.full_name || "",
          education: data.education || "",
          status: data.status || "searching",
          skills: data.skills || [],
        });
      } catch (error) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setProfile(formData);
      setEditMode(false);
    } catch (error) {
      setError("Failed to update profile");
    }
  };

  if (loading) return <p className="text-center text-xl font-semibold">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Profile</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>
      {editMode ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Full Name"
          />
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Education"
          />
          <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="searching">Searching for Job</option>
            <option value="working">Currently Working</option>
            <option value="internship">Internship</option>
          </select>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            Save Changes
          </button>
        </form>
      ) : (
        <div>
          <div className="flex items-center space-x-6 mb-6">
            {profile.profile_picture ? (
              <img src={profile.profile_picture} alt="Profile" className="w-20 h-20 rounded-full border-4 border-blue-400" />
            ) : (
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-lg font-semibold">
                N/A
              </div>
            )}
            <div>
              <p className="text-2xl font-semibold text-gray-900">{profile.full_name}</p>
              <p className="text-md text-gray-500">Status: <span className="font-medium text-blue-600">{profile.status}</span></p>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Education</h3>
            <p className="text-gray-700 border p-3 rounded-md bg-gray-50">{profile.education || "Not provided"}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Skills</h3>
            {profile.skills.length > 0 ? (
              <ul className="list-disc pl-6 text-gray-700">
                {profile.skills.map((skill, index) => (
                  <li key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md inline-block m-1">
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 border p-3 rounded-md bg-gray-50">No skills added</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
