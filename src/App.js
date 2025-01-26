// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from './components/NewsCard';
import './App.css';

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = 'e5071d7a1aa64162a97b80d9332cf650';  // Replace with your NewsAPI key
  const apiEndpoint = 'https://newsapi.org/v2/everything';

  // Fetch news articles from the API
  const fetchNews = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(apiEndpoint, {
        params: {
          apiKey,
          q: query,
          language: 'en',
        },
      });
      setNewsArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching the news:', error);
    }
    setLoading(false);
  };

  // Call the API when the component is mounted
  useEffect(() => {
    fetchNews('');
  }, []);

  // Handle search input change
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  // Handle form submission (search)
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchNews(query);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>News Aggregator</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search news..."
          />
          <button type="submit">Search</button>
        </form>
      </header>

      <main>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="news-container">
            {newsArticles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
