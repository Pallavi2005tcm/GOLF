

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");

const FloodNews = ({ stateName = "punjab" }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/api/flood-news");
      setArticles(res.data.articles || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching news:", err);
      setArticles([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();

    const handleNewNews = (data) => {
      if (data.state === stateName && Array.isArray(data.articles)) {
        // prepend new articles
        setArticles((prev) => [...data.articles, ...prev]);
      }
    };

    socket.on("floodNews", handleNewNews);

    return () => socket.off("floodNews", handleNewNews);
  }, [stateName]);

  // Filter articles by source
  const filteredArticles =
    activeFilter === "all"
      ? articles
      : articles.filter((a) =>
          a.source.toLowerCase().includes(activeFilter)
        );

  const formatSourceName = (url) => {
    if (url.includes("timesofindia")) return "Times of India";
    if (url.includes("ndtv") || url.includes("feedburner")) return "NDTV";
    if (url.includes("hindustantimes")) return "Hindustan Times";
    if (url.includes("bbci")) return "BBC India";
    return "Unknown Source";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return d.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSourceColor = (source) => {
    if (source.includes("timesofindia")) return "bg-blue-600";
    if (source.includes("ndtv")) return "bg-teal-600";
    if (source.includes("hindustantimes")) return "bg-cyan-700";
    if (source.includes("bbci")) return "bg-sky-700";
    return "bg-gray-600";
  };

  return (
    <div className="min-h-screen bg-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
            <svg className="w-10 h-10 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" stroke极 join="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-black-800 mb-2">
            Latest News
          </h1>
          {/* <p className="text-blue-600 text-lg">
            Latest flood-related news for {stateName.charAt(0).toUpperCase() + stateName.slice(1)}
          </p> */}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["all", "timesofindia", "ndtv", "hindustantimes", "bbci"].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm ${
                activeFilter === filter
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-blue-700 hover:bg-blue-50 border border-blue-200"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "all"
                ? "All Sources"
                : filter === "timesofindia"
                ? "Times of India"
                : filter === "hindustantimes"
                ? "Hindustan Times"
                : filter.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center py-16">
            <div className="w-14 h-14 border-4 border-blue-500 border极 t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-blue-700 font-medium">Fetching latest flood alerts...</p>
          </div>
        )}

        {/* News List */}
        {!loading && filteredArticles.length > 0 && (
          <div className="grid gap-6">
            {filteredArticles.map((article, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-blue-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold text-white ${getSourceColor(article.source)}`}>
                    {formatSourceName(article.source)}
                  </span>
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">{formatDate(article.pubdate)}</span>
                </div>

                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold text-blue-900 hover:text-blue-700 transition-colors mb-3 block"
                >
                  {article.title}
                </a>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{article.summary}</p>

                <div className="flex justify-between items-center mt-5 pt-4 border-t border-blue-100">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center group"
                  >
                    <span className="mr-2">Read full story</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7极 H3"></path>
                    </svg>
                  </a>
                  
                  <div className="flex space-x-3">
                    {/* Bookmark Icon - Changed to black */}
                    <button className="text-black hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                      </svg>
                    </button>
                    
                    {/* Share Icon - Changed to black */}
                    <button className="text-black hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-blue-100">
            <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full mb-4">
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">No flood alerts found</h3>
            <p className="text-blue-600 max-w-md mx-auto">There are currently no flood alerts for the selected filters. Please check back later or try different sources.</p>
          </div>
        )}

        {/* Live Indicator */}
        {/* <div className="fixed bottom-6 right-6 flex items-center bg-blue-600 text-white px-4 py-2.5 rounded-full shadow-lg z-10">
          <div className="w-3 h-3 bg-teal-300 rounded-full animate-pulse mr-2"></div>
          <span className="text-sm font-medium">Live Updates Active</span>
        </div> */}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-blue-200 text-center">
          <p className="text-black-600 text-sm">
            Flood Alert System • Real-time monitoring • {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FloodNews;