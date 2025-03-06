import React, { useEffect, useState } from "react";
import axios from "axios";

const BusinessList = () => {
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        const fetchIdeas = async () => {
            try {
                const response = await axios.get("http://localhost:5000/business-ideas/all");
                setIdeas(response.data);
            } catch (error) {
                console.error("Error fetching business ideas", error);
            }
        };
        fetchIdeas();
    }, []);

    return (
        <div>
            <h2>Business Ideas</h2>
            {ideas.length > 0 ? (
                <ul>
                    {ideas.map((idea, index) => (
                        <li key={index}>
                            <h3>{idea.businessName}</h3>
                            <p>{idea.description}</p>
                            <p>Contact: {idea.contactDetails}</p>
                            {idea.poster && <img src={`http://localhost:5000/${idea.poster}`} alt="Poster" style={{ width: "200px" }} />}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No business ideas shared yet.</p>
            )}
        </div>
    );
};

export default BusinessList;
