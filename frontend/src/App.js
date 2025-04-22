import React, { useState } from "react";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { signup, login } from "./services/authService";  // Correct path to services/authService.js

function App() {
  const [isLogin, setIsLogin] = useState(true); // To toggle between Login/Signup
  const [message, setMessage] = useState(""); // To display success or error messages

  // Handle the form submission for Login
  const handleLogin = async (username, password) => {
    try {
      const response = await login(username, password); // Call login service
      setMessage("Login successful!");
      // Optionally, store the token in localStorage or global state
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      setMessage("Invalid username or password.");
    }
  };

  // Handle the form submission for Signup
  const handleSignup = async (username, email, password) => {
    try {
      const response = await signup(username, email, password); // Call signup service
      setMessage("Signup successful! You can now log in.");
      // Optionally, handle success actions after signup
    } catch (error) {
      setMessage("Error during signup.");
    }
  };

  return (
    <div className="App">
      <h1>Authentication</h1>
      {isLogin ? (
        <Login onSubmit={handleLogin} /> // Pass the handleLogin function as prop
      ) : (
        <Signup onSubmit={handleSignup} /> // Pass the handleSignup function as prop
      )}
      {message && <p>{message}</p>}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default App;
