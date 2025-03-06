import React, { useEffect, useState } from "react";
import { fetchNews } from "../api"; // Ensure this path is correct
import "./NewsList.css"; // Importing the CSS file

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getNews = async () => {
            try {
                const data = await fetchNews();
                if (data.error) {
                    setError(data.error);
                } else {
                    setNews(data.articles || []);
                }
            } catch (err) {
                setError("Failed to fetch news");
                console.error("Error fetching news:", err);
            }
        };

        getNews();
    }, []);

    return (
        <div className="news-container">
            <h1 className="news-title">Latest News</h1>
            {error ? (
                <div className="error-message">Error: {error}</div>
            ) : news.length > 0 ? (
                <ul className="news-list">
                    {news.map((article, index) => (
                        <li key={index} className="news-item">
                            <h2 className="news-heading">{article.title}</h2>
                            <p className="news-description">{article.description}</p>
                            <a
                                href={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="news-link"
                            >
                                Read more
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-news">No news available.</p>
            )}
        </div>
    );
};

export default NewsList;
