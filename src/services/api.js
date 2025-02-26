import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://192.168.0.140:8000/api";

export const fetchProfile = async (token) => {
  const response = await axios.get(`${API_URL}/users/profile/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProfile = async (token, formData) => {
  const response = await axios.put(`${API_URL}/users/profile/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
