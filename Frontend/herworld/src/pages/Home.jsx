import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Ensure this file contains the updated styles

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
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  },
  {
    title: "Women Thrive",
    description: "Empower, Elevate, Excel!",
    path: "/",
    image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  },
  {
    title: "Beyond Boundaries",
    description: "Stay Informed, Stay Ahead!",
    path: "/news",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80",
  },
  {
    title: "Women's Wonderland",
    description: "Explore, Create, Inspire!",
    path: "/wonderland",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  },
];

export default Home;