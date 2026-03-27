import { useEffect, useState } from "react";
import TrailerPlayer from "./TrailerPlayer";

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd700">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.27l-6.18 3.75L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function RatingBar({ rating }) {
  return (
    <div className="rating-track" title={`${rating}/10`}>
      <div className="rating-fill" style={{ width: `${(rating / 10) * 100}%` }} />
    </div>
  );
}

export default function MovieModal({ movie, onClose }) {
  const [imgError, setImgError]       = useState(false);
  const [backdropError, setBackdropError] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Escape closes the detail modal (not when trailer is active — TrailerPlayer handles that)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && !showTrailer) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, showTrailer]);

  if (!movie) return null;

  const fallbackPoster = `https://placehold.co/400x600/1a1a27/6c63ff?text=${encodeURIComponent(movie.title)}`;

  return (
    <>
      <div
        className="modal-overlay"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        role="dialog"
        aria-modal="true"
        aria-label={`${movie.title} details`}
      >
        <div className="modal-box">
          {/* Close button */}
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>

          {/* Backdrop */}
          <div className="modal-backdrop">
            {!backdropError && movie.backdrop ? (
              <img
                src={movie.backdrop}
                alt={`${movie.title} backdrop`}
                onError={() => setBackdropError(true)}
              />
            ) : (
              <div className="backdrop-fallback" />
            )}
            <div className="backdrop-fade" />
          </div>

          {/* Main content */}
          <div className="modal-content">
            {/* Poster */}
            <div className="modal-poster">
              <img
                src={imgError ? fallbackPoster : movie.poster}
                alt={`${movie.title} poster`}
                onError={() => setImgError(true)}
              />
            </div>

            {/* Info */}
            <div className="modal-info">
              <div className="modal-tags">
                {movie.tags?.map((t) => (
                  <span className="modal-tag" key={t}>{t}</span>
                ))}
              </div>

              <h2 className="modal-title">{movie.title}</h2>

              <div className="modal-meta-row">
                <span className="meta-item">
                  <StarIcon /> <strong>{movie.rating}</strong>/10
                </span>
                <span className="meta-dot">·</span>
                <span className="meta-item">{movie.year}</span>
                <span className="meta-dot">·</span>
                <span className="meta-item">{movie.runtime}</span>
                <span className="meta-dot">·</span>
                <span className="meta-item genre-chip">{movie.genre}</span>
              </div>

              <RatingBar rating={movie.rating} />

              {/* ── PLAY TRAILER BUTTON ── */}
              {movie.trailerKey && (
                <button
                  id="play-trailer-btn"
                  className="play-trailer-btn"
                  onClick={() => setShowTrailer(true)}
                  aria-label={`Play ${movie.title} trailer`}
                >
                  <span className="play-icon-wrap">
                    <PlayIcon />
                  </span>
                  Watch Trailer
                </button>
              )}

              <div className="modal-section">
                <h4 className="section-label">Overview</h4>
                <p className="modal-desc">{movie.description}</p>
              </div>

              <div className="modal-section">
                <h4 className="section-label">Director</h4>
                <p className="director-name">{movie.director}</p>
              </div>

              <div className="modal-section">
                <h4 className="section-label">Cast</h4>
                <div className="actors-grid">
                  {movie.actors.map((actor) => (
                    <div className="actor-chip" key={actor}>
                      <span className="actor-avatar">
                        {actor.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </span>
                      <span className="actor-name">{actor}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h4 className="section-label">Language</h4>
                <p className="director-name">{movie.language}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TRAILER PLAYER (rendered on top of modal) ── */}
      {showTrailer && (
        <TrailerPlayer
          trailerKey={movie.trailerKey}
          title={movie.title}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </>
  );
}
