import MovieCard from "./MovieCard";

export default function MovieList({ movies, loading, error, onRetry, onMovieClick }) {
  if (loading) {
    return (
      <div className="spinner-wrap" aria-live="polite" aria-busy="true">
        <div className="spinner" role="status" aria-label="Loading" />
        <p className="spinner-text">Fetching movies…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid-wrap">
        <div className="error-box" role="alert">
          <span className="err-icon">⚡</span>
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button id="retry-btn" className="retry-btn" onClick={onRetry}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="grid-wrap">
        <div className="state-box" role="status">
          <span className="icon">🎬</span>
          <h2>No movies found</h2>
          <p>Try a different search term or adjust your filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid-wrap">
      <div className="movie-grid" role="list">
        {movies.map((movie) => (
          <div key={movie.id} role="listitem">
            <MovieCard movie={movie} onClick={onMovieClick} />
          </div>
        ))}
      </div>
    </div>
  );
}
