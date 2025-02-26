import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { fetchProfile, updateProfile, fetchSkills, addSkill } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const StudentProfileEdit = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    full_name: "",
    education: "",
    status: "searching",
    skills: [],
    profile_picture: null,
    resume: null,
  });
  const [availableSkills, setAvailableSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchProfile()
        .then((data) => {
          setProfileData({
            full_name: data.full_name,
            education: data.education,
            status: data.status,
            skills: data.skills || [],
            profile_picture: data.profile_picture,
            resume: data.resume,
          });
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [user, navigate]);

  useEffect(() => {
    if (searchTerm) {
      fetchSkills({ search: searchTerm }).then((data) => {
        setAvailableSkills(data.results);
      });
    } else {
      setAvailableSkills([]);
    }
  }, [searchTerm]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.files[0] });
  };

  const handleAddSkill = async (skill) => {
    if (!profileData.skills.find((s) => s.name === skill.name)) {
      setProfileData({ ...profileData, skills: [...profileData.skills, skill] });
    }
  };

  const handleRemoveSkill = (skillId) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter((skill) => skill.id !== skillId),
    });
  };
  
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("full_name", profileData.full_name);
    formData.append("education", profileData.education);
    formData.append("status", profileData.status);
    profileData.skills.forEach((skill) => formData.append("skills", skill.id));

    if (profileData.profile_picture instanceof File) {
      formData.append("profile_picture", profileData.profile_picture);
    }
    if (profileData.resume instanceof File) {
      formData.append("resume", profileData.resume);
    }

    await updateProfile(formData);
    toast.success(t('profile_updated_success'), {})
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block font-medium">Full Name:</label>
          <input
            type="text"
            name="full_name"
            value={profileData.full_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Education */}
        <div>
          <label className="block font-medium">Education:</label>
          <input
            type="text"
            name="education"
            value={profileData.education}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium">Status:</label>
          <select
            name="status"
            value={profileData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="searching">Searching for Job</option>
            <option value="working">Currently Working</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        {/* Existing Skills */}
        <div>
          <label className="block font-medium">Your Skills:</label>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.length > 0 ? (
              profileData.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center"
                >
                  {skill.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="ml-2 text-sm text-red-300 hover:text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))
            ) : (
              <p className="text-gray-500">No skills added</p>
            )}
          </div>
        </div>

        {/* Add New Skill */}
        <div>
          <label className="block font-medium">Add Skills:</label>
          <input
            type="text"
            placeholder="Search for skills..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {availableSkills.length > 0 && (
            <ul className="bg-white border rounded mt-1 max-h-40 overflow-y-auto">
              {availableSkills.map((skill) => (
                <li
                  key={skill.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleAddSkill(skill)}
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Profile Picture */}
        <div>
          <label className="block font-medium">Profile Picture:</label>
          <input type="file" name="profile_picture" onChange={handleFileChange} className="w-full p-2 border rounded" />
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block font-medium">Resume (PDF):</label>
          <input type="file" name="resume" onChange={handleFileChange} className="w-full p-2 border rounded" />
        </div>

        {/* Submit */}
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default StudentProfileEdit;
