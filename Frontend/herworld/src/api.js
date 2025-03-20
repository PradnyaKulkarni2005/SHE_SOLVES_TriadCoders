import axios from 'axios';

// ✅ Use Environment Variable for API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ✅ Axios Configuration for Credentials (JWT in Cookies)
const axiosInstance = axios.create({
  baseURL: API_URL, 
  withCredentials: true, // Ensures cookies are sent with requests
});

// ✅ Register User
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/users/register", userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: "Failed to register user" };
  }
};

// ✅ Login User
export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/users/login", userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    return { error: "Failed to login user" };
  }
};

// ✅ Fetch News
export const fetchNews = async () => {
  try {
    const response = await axiosInstance.get("/news");
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

// ✅ Submit Business Idea (With File Upload)
export const submitBusinessIdea = async (formData) => {
  try {
    const response = await axiosInstance.post("/businessIdeas/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting business idea:", error);
    return { error: "Failed to submit business idea" };
  }
};

// ✅ Fetch Business Ideas
export const fetchBusinessIdeas = async () => {
  try {
    const response = await axiosInstance.get("/businessIdeas/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching business ideas:", error);
    return [];
  }
};
