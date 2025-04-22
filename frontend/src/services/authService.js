import axios from "axios";

// Base URL for your backend API
const API_URL = "http://localhost:5000"; // Update this with your actual backend URL if different

// Signup function to create a new user
export const signup = (username, email, password) => {
  return axios.post(`${API_URL}/signup`, {
    username,
    email,
    password
  });
};

// Login function to authenticate the user and get a token
export const login = (username, password) => {
  return axios.post(`${API_URL}/login`, {
    username,
    password
  });
};
