import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { fetchProfile, updateProfile } from "../../services/api";
import { useNavigate } from "react-router-dom";

const StudentProfileEdit = () => {
  const { user, logout } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    full_name: "",
    education: "",
    status: "searching",
    skills: [],
    profile_picture: null,
    resume: null,
  });
  const [skillsList, setSkillsList] = useState([
    { id: 1, name: "Python" },
    { id: 2, name: "JavaScript" },
    { id: 3, name: "React" },
    { id: 4, name: "Django" },
    { id: 5, name: "Flask" },
  ]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchProfile(localStorage.getItem("token"))
        .then((data) => {
          setProfileData({
            full_name: data.full_name,
            education: data.education,
            status: data.status,
            skills: data.skills.map((skill) => skill.id),
            profile_picture: data.profile_picture,
            resume: data.resume,
          });
          setEmail(data.email);
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.files[0] });
  };

  const handleSkillsChange = (e) => {
    const selectedSkills = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setProfileData({ ...profileData, skills: selectedSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("full_name", profileData.full_name);
    formData.append("education", profileData.education);
    formData.append("status", profileData.status);
    console.log(profileData.skills);
    profileData.skills.forEach((skill) =>
      formData.append("skills", parseInt(skill))
    );
    if (profileData.profile_picture instanceof File) {
      formData.append("profile_picture", profileData.profile_picture);
    }
    if (profileData.resume instanceof File) {
      formData.append("resume", profileData.resume);
    }

    await updateProfile(localStorage.getItem("token"), formData);
    alert("Profile updated successfully!");
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <label className="block">Full Name:</label>
        <input
          type="text"
          name="full_name"
          value={profileData.full_name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />

        <label className="block">Education:</label>
        <input
          type="text"
          name="education"
          value={profileData.education}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />

        <label className="block">Status:</label>
        <select
          name="status"
          value={profileData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="searching">Searching for Job</option>
          <option value="working">Currently Working</option>
          <option value="internship">Internship</option>
        </select>

        <label className="block">Skills:</label>
        <select
          multiple
          name="skills"
          value={profileData.skills}
          onChange={handleSkillsChange}
          className="w-full p-2 border rounded mb-2"
        >
          {skillsList.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>

        <label className="block">Profile Picture:</label>
        <input
          type="file"
          name="profile_picture"
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-2"
        />

        <label className="block">Resume (PDF):</label>
        <input
          type="file"
          name="resume"
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-2"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default StudentProfileEdit;
