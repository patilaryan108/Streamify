import { useState } from "react";

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#ffd700">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.27l-6.18 3.75L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function MovieCard({ movie, onClick }) {
  const [imgError, setImgError] = useState(false);
  const fallback = `https://placehold.co/300x450/1a1a27/6c63ff?text=${encodeURIComponent(movie.title)}`;

  return (
    <article
      className="movie-card"
      tabIndex={0}
      onClick={() => onClick(movie)}
      onKeyDown={(e) => e.key === "Enter" && onClick(movie)}
      aria-label={`${movie.title}, rated ${movie.rating}`}
      role="button"
    >
      <div className="card-poster">
        <img
          src={imgError ? fallback : movie.poster}
          alt={`${movie.title} poster`}
          loading="lazy"
          onError={() => setImgError(true)}
        />
        {/* Hover overlay */}
        <div className="card-overlay">
          <p className="overlay-desc">{movie.description}</p>
          <span className="view-detail-hint">Click to view details →</span>
        </div>
        <div className="card-badge">
          <StarIcon /> {movie.rating}
        </div>
      </div>
      <div className="card-body">
        <h3 className="card-title">{movie.title}</h3>
        <div className="card-meta">
          <span className="card-genre">{movie.genre}</span>
          <span className="card-year">{movie.year}</span>
        </div>
      </div>
    </article>
  );
}
