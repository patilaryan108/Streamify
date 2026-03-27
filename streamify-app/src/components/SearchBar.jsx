import { useState } from "react";

export default function SearchBar({ query, onSearch }) {
  const [local, setLocal] = useState(query);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(local.trim());
  };

  const handleClear = () => {
    setLocal("");
    onSearch("");
  };

  return (
    <form className="search-wrap" onSubmit={handleSubmit} role="search">
      <span className="search-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        id="movie-search-input"
        type="text"
        placeholder="Search movies, genres…"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        aria-label="Search movies"
      />
      {local && (
        <button type="button" className="clear-btn" onClick={handleClear} aria-label="Clear search">
          ✕
        </button>
      )}
      <button id="movie-search-btn" type="submit" className="search-btn">
        Search
      </button>
    </form>
  );
}
