// src/components/LawsList.js
import React, { useEffect, useState } from 'react';
import lawsData from '../data/Laws.json'; // Import the JSON file
import './LawsList.css'; // Import the CSS file

const LawsList = () => {
  const [laws, setLaws] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay (optional, for demonstration purposes)
    const timer = setTimeout(() => {
      setLaws(lawsData); // Set the data from the JSON file
      setLoading(false); // Set loading to false
    }, 1000); // 1-second delay

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (loading) {
    return <div className="loading-message">Loading laws...</div>;
  }

  return (
    <div className="laws-container">
      {laws.map((law) => (
        <div key={law.id} className="law-card">
          <div className="card-content">
            <h2>{law.title}</h2>
            <p>{law.description}</p>
            <div className="explanation">
              <strong>Explanation:</strong> {law.explanation}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LawsList;