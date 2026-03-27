import { useEffect } from "react";

export default function TrailerPlayer({ trailerKey, title, onClose }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="trailer-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} trailer`}
    >
      <div className="trailer-box">
        {/* Header */}
        <div className="trailer-header">
          <div className="trailer-title-wrap">
            <span className="trailer-dot" />
            <span className="trailer-label">Official Trailer</span>
            <span className="trailer-movie-name">{title}</span>
          </div>
          <button className="trailer-close" onClick={onClose} aria-label="Close trailer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* YouTube iframe */}
        <div className="trailer-frame-wrap">
          <iframe
            className="trailer-frame"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
            title={`${title} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
