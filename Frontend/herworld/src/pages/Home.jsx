import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Ensure this file contains the updated styles
import boundaries from "../assets/boundaries.jpg";
import forum from "../assets/forum.jpg";
import thrive from "../assets/womenthrive.jpg";
import wonderland from "../assets/wonderland.jpg";
const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleFeatureClick = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      {/* Background Image Section */}
      <div className="background-image"></div>

      {/* Content Overlay */}
      <div className="content">
        <h1>EMPOWER | PROTECT | TRANSFORM</h1>
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
{/* 
        <div className="features">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card"
              onClick={() => handleFeatureClick(feature.path)}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="feature-image"
              />
              <div className="text-content">
                <h3 className="heading">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div> */}
      </div>
      <div className="features">
        {features.map((feature, index) => (
          <div
            key={index}
            className="card"
            onClick={() => handleFeatureClick(feature.path)}
          >
            <img src={feature.image} alt={feature.title} className="feature-image" />
            <h3 className="heading">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Feature List with Images
const features = [
  {
    title: "Fem Forum",
    description: "Your Voice, Your Power!",
    path: "/forum",
    image: forum,
  },
  {
    title: "Women Thrive",
    description: "Empower, Elevate, Excel!",
    path: "/",
    image: thrive,
  },
  {
    title: "Beyond Boundaries",
    description: "Stay Informed, Stay Ahead!",
    path: "/news",
    image: boundaries,
  },
  {
    title: "Women's Wonderland",
    description: "Explore, Create, Inspire!",
    path: "/wonderland",
    image: wonderland,
  },
];

export default Home;