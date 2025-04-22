import React, { useState } from "react";

const Login = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await onSubmit(username, password); // Call the onSubmit function passed as prop
      console.log(response.data); // Log the response data (JWT or any other data)
      setMessage("Login successful!"); // Set success message
    } catch (error) {
      console.error("Login failed:", error); // Log error if something goes wrong
      setMessage("Invalid username or password."); // Set error message
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>} {/* Display success or error message */}
    </div>
  );
};

export default Login;
