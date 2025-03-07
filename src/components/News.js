import React, { useState, useEffect } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("general"); // Default category
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const [currentDateTime, setCurrentDateTime] = useState(""); // Date, time, and day

  const API_KEY = process.env.REACT_APP_GNEWS_API_KEY; // Access the API key from .env
  const url = `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=en&category=${category}`;

  // Define available categories
  const categories = [
    "general",
    "business",
    "technology",
    "sports",
    "science",
    "health",
    "entertainment",
    "world",
    "nation",
    "environment",
  ];

  // Fetch news based on category
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(url);
        setNews(response.data.articles);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, [url, category]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode); // Save preference

    // Apply dark mode class to the body element
    if (newDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  // Check for saved dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);

    // Apply dark mode class to the body element on initial load
    if (savedDarkMode) {
      document.body.classList.add("dark-mode");
    }
  }, []);

  // Update current date, time, and day
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = {
        weekday: "long", // Full weekday name (e.g., Thursday)
        year: "numeric", // Full year (e.g., 2025)
        month: "long", // Full month name (e.g., March)
        day: "numeric", // Day of the month (e.g., 6)
        hour: "2-digit", // Hour (e.g., 05)
        minute: "2-digit", // Minute (e.g., 47)
        second: "2-digit", // Second (e.g., 45)
        hour12: false, // Use 24-hour format
      };
      const formattedDateTime = now.toLocaleString("en-US", options);
      setCurrentDateTime(formattedDateTime);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Function to format the date and time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Format date and time based on user's locale
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Separate news articles into different categories
  const mostImportantNews = news.slice(0, 3); // First 3 articles are most important
  const latestNews = news.slice(3, 7); // Next 4 articles are latest news
  const popularNews = news.slice(7); // Remaining articles are popular news

  return (
    <div className="news-container">
      {/* Dark Mode Toggle */}
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Title and Current Date/Time */}
      <h1>@BC News</h1>
      <p className="current-date-time">{currentDateTime}</p>

      {/* Category Navigation Bar */}
      <nav className="category-nav">
        <ul className="category-list">
          {categories.map((cat) => (
            <li
              key={cat}
              className={`category-item ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)} {/* Capitalize first letter */}
            </li>
          ))}
        </ul>
      </nav>

      {/* News Grid */}
      <div className="news-grid">
        {/* Left Column - Most Important News */}
        <div className="left-column">
        <br />
          <h2>Most Important</h2>
          {mostImportantNews.map((article, index) => (
            <div key={index} className="news-card">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <p className="published-date">
                Published: {formatDate(article.publishedAt)}
              </p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="news-image"
                />
              )}
            </div>
          ))}
        </div>

        {/* Middle Column - Latest News */}
        <div className="middle-column">
        <h2>BREAKINGS</h2>  
          {latestNews.map((article, index) => (
            <div key={index} className="news-card">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <p className="published-date">
                Published: {formatDate(article.publishedAt)}
              </p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="news-image"
                />
              )}
            </div>
          ))}
        </div>

        {/* Right Column - Popular News */}
        <div className="right-column">
        <br />
          <h2>Most Popular</h2>
          {popularNews.map((article, index) => (
            <div key={index} className="news-card">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <p className="published-date">
                Published: {formatDate(article.publishedAt)}
              </p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="news-image"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;