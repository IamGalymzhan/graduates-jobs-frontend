import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

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

export const fetchProfile = async (token) => {
  return await axios.get(`${API_URL}/users/profile/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
