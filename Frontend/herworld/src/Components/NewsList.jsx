import React, { useEffect, useState } from 'react';
import { fetchNews } from '../api'; // Ensure this path is correct
import './NewsList.css';
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

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>News</h1>
            {news.length > 0 ? (
                <ul>
                    {news.map((article, index) => (
                        <li key={index}>
                            <h2>{article.title}</h2>
                            <p>{article.description}</p>
                            <a href={article.link} target="_blank" rel="noopener noreferrer">
                                Read more
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No news available.</p>
            )}
        </div>
    );
};

export default NewsList;
