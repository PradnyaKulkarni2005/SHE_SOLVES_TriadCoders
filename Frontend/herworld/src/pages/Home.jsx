import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./Home.css";

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle Login Button Click
  const handleLoginClick = () => {
    navigate("/login"); // Redirect to /login
  };

  // Handle Signup Button Click
  const handleSignupClick = () => {
    navigate("/signup"); // Redirect to /signup
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero">
        <h1>Empowering Women, Connecting Communities</h1>
        <p>
          A platform where women can share experiences, explore business ideas,
          access health tips, and stay updated with the world.
        </p>
        <div className="auth-buttons">
          <button className="login-button" onClick={handleLoginClick}>
            Login
          </button>
          <button className="signup-button" onClick={handleSignupClick}>
            Signup
          </button>
        </div>
        <Link to="/forum">
          <button className="cta-button">Join the Community</button>
        </Link>
      </div>

      {/* Features Section */}
      <div className="features">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Feature List
const features = [
  {
    title: "Fem Forum",
    description: "Your Voice, Your Power!",
  },
  {
    title: "Women Thrive",
    description: "Empower, Elevate, Excel!",
  },
  {
    title: "Beyond Boundaries",
    description: "Stay Informed, Stay Ahead!",
  },
  {
    title: "Women's Wonderland",
    description: "Explore, Create, Inspire!",
  },
];

export default Home;