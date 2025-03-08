import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Signup button clicked");
    try {
      const data = await registerUser({ name, email, password });
      console.log("Response from server:", data);
      if (data.message) {
        alert("Signup successful! Please log in.");
        navigate("/login");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title"> Signup</h2>
      <form onSubmit={handleSignup} className="login-form">
        <input type="text" className="login-input" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
        <input type="email" className="login-input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="login-input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="login-button">Signup</button>
      </form>
    </div>
  );
};

export default Signup;