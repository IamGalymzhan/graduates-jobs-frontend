import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://192.168.0.140:8000/api";

export const registerStudent = async (formData) => {
  return await axios.post(`${API_URL}/users/register/`, {
    ...formData,
    user_type: "student",
  });
};

export const registerEmployer = async (formData) => {
  return await axios.post(`${API_URL}/users/register/`, {
    ...formData,
    user_type: "employer",
  });
};

export const loginUser = async (formData) => {
  return await axios.post(`${API_URL}/users/login/`, formData);
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No authentication token found");

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const fetchProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/profile/`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error.response?.data || error);
    throw error;
  }
};

export const updateProfile = async (formData) => {
  try {
    const response = await axios.put(`${API_URL}/users/profile/`, formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error.response?.data || error);
    throw error;
  }
};


export const getJobs = async ({ search, jobType, location }) => {
  try {
    const queryParams = new URLSearchParams();
    if (search) queryParams.append("search", search);
    if (jobType !== "all") queryParams.append("job_type", jobType);
    if (location) queryParams.append("location", location);

    const response = await fetch(`${API_URL}/jobs/jobs?${queryParams.toString()}`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};



export const getUserProfile = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    window.location.href = '/login';
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    throw new Error("No access token found. Redirecting to login.");
  }

  try {
    const response = await fetch(`${API_URL}/users/profile/`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      window.location.href = '/login';
      localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
      throw new Error("Failed to fetch profile data. Redirecting to login.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    window.location.href = '/login';
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    throw error;
  }
};
