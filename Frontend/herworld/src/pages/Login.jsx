import React, { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Correct import
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'; // Correct import for icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login button clicked");
    try {
      const data = await loginUser({ email, password });
      console.log("Response from server:", data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/forum");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Empower Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-group">
          <FontAwesomeIcon icon={faEnvelope} className="icon" /> {/* Icon */}
          <input 
            type="email" 
            placeholder="Email" 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="login-input"
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faLock} className="icon" /> {/* Icon */}
          <input 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="login-input"
          />
        </div>
        <button type="submit" className="login">Login</button>
      </form>
    </div>
  );
};

export default Login;