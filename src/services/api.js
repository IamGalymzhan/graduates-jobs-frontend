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

export const loginGoogleUser = async (token) => {
  return await axios.get(`${API_URL}/users/googledata/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

export const updatedUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/googledata/`, {
      headers: getAuthHeaders(),
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error.response?.data || error);
    throw error;
  }
};

export const getJobs = async ({ search, jobType, location }) => {
  try {
    const queryParams = new URLSearchParams();
    if (search) queryParams.append("search", search);
    if (jobType !== "all") queryParams.append("job_type", jobType);
    if (location) queryParams.append("location", location);

    const response = await fetch(
      `${API_URL}/jobs/jobs?${queryParams.toString()}`
    );
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
    window.location.href = "/login";
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    throw new Error("No access token found. Redirecting to login.");
  }

  try {
    const response = await fetch(`${API_URL}/users/profile/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      window.location.href = "/login";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      throw new Error("Failed to fetch profile data. Redirecting to login.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    window.location.href = "/login";
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    throw error;
  }
};

export const fetchStudents = async ({ ordering, page, search }) => {
  try {
    const queryParams = new URLSearchParams();
    if (ordering) queryParams.append("ordering", ordering);
    if (page) queryParams.append("page", page);
    if (search) queryParams.append("search", search);

    const response = await axios.get(
      `${API_URL}/users/students/?${queryParams.toString()}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error.response?.data || error);
    throw error;
  }
};

export const postJob = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/jobs/jobs/`, formData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error posting job:", error.response?.data || error);
    throw error;
  }
};

export const fetchJobDetails = async (jobId) => {
  try {
    const response = await axios.get(`${API_URL}/jobs/jobs/${jobId}/`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching job details:", error.response?.data || error);
    throw error;
  }
};

export const fetchEmployerApplications = async ({ ordering, page, search }) => {
  try {
    const queryParams = new URLSearchParams();
    if (ordering) queryParams.append("ordering", ordering);
    if (page) queryParams.append("page", page);
    if (search) queryParams.append("search", search);

    const response = await axios.get(
      `${API_URL}/jobs/employer/applications/?${queryParams.toString()}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching employer job applications:",
      error.response?.data || error
    );
    throw error;
  }
};

export const fetchSkills = async ({ search = "", page = 1, pageSize = 10 }) => {
  try {
    const queryParams = new URLSearchParams();
    if (search) queryParams.append("search", search);
    if (page) queryParams.append("page", page);
    if (pageSize) queryParams.append("page_size", pageSize);

    const response = await fetch(
      `${API_URL}/users/skills/?${queryParams.toString()}`,
      {
        method: "GET",
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch skills.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
};

export const addSkill = async (skillName) => {
  try {
    const response = await fetch(`${API_URL}/users/skills/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ name: skillName }),
    });

    if (!response.ok) {
      throw new Error("Failed to add skill.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding skill:", error);
    throw error;
  }
};

export const fetchAppliedJobs = async ({ ordering, page, search }) => {
  try {
    const queryParams = new URLSearchParams();
    if (ordering) queryParams.append("ordering", ordering);
    if (page) queryParams.append("page", page);
    if (search) queryParams.append("search", search);

    const response = await axios.get(
      `${API_URL}/jobs/applications/?${queryParams.toString()}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching applied jobs:",
      error.response?.data || error
    );
    throw error;
  }
};

export const applyForJob = async (jobId, formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/jobs/jobs/${jobId}/apply/`,
      formData,
      {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error applying for job:", error.response?.data || error);
    throw error;
  }
};

export const fetchAllApplications = async ({ ordering, page, search }) => {
  try {
    const queryParams = new URLSearchParams();
    if (ordering) queryParams.append("ordering", ordering);
    if (page) queryParams.append("page", page);
    if (search) queryParams.append("search", search);

    const response = await axios.get(
      `${API_URL}/faculty/applications/?${queryParams.toString()}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching all applications:",
      error.response?.data || error
    );
    throw error;
  }
};

export const fetchFacultyStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/faculty/stats/`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching faculty stats:",
      error.response?.data || error
    );
    throw error;
  }
};
