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
