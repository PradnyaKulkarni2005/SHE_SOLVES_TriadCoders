import axios from 'axios';

const API_URL =  process.env.REACT_APP_API_URL; 

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return response.json();
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: "Failed to register user" };
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return response.json();
  } catch (error) {
    console.error("Error logging in user:", error);
    return { error: "Failed to login user" };
  }
};

// Fetch News
export const fetchNews = async () => {
  try {
    const response = await axios.get(`${API_URL}/news`);
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

// Submit Business Idea
export const submitBusinessIdea = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/businessIdeas/add`, formData, {
      headers: { "Content-Type": "multipart/form-data" }, // for handling file uploads
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting business idea:", error);
    return { error: "Failed to submit business idea" };
  }
};

// Fetch Business Ideas
export const fetchBusinessIdeas = async () => {
  try {
    const response = await axios.get(`${API_URL}/businessIdeas/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching business ideas:", error);
    return [];
  }
};