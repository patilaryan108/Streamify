import { useState, useEffect, useCallback } from "react";
import { MOVIES } from "./data/movies";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import MovieList from "./components/MovieList";
import MovieModal from "./components/MovieModal";
import "./App.css";

export default function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchKey, setFetchKey] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);

  /* Simulate fetch */
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const t = setTimeout(() => {
      if (cancelled) return;
      setAllMovies(MOVIES);
      setLoading(false);
    }, 800);
    return () => { cancelled = true; clearTimeout(t); };
  }, [fetchKey]);

  /* Apply filters */
  useEffect(() => {
    let result = [...allMovies];
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.genre.toLowerCase().includes(q) ||
          m.director?.toLowerCase().includes(q) ||
          m.actors?.some((a) => a.toLowerCase().includes(q))
      );
    }
    if (genre && genre !== "All Genres") result = result.filter((m) => m.genre === genre);
    if (rating) result = result.filter((m) => m.rating >= parseFloat(rating));
    result.sort((a, b) => b.rating - a.rating);
    setMovies(result);
  }, [allMovies, query, genre, rating]);

  const handleSearch  = useCallback((q) => setQuery(q), []);
  const handleGenre   = useCallback((g) => setGenre(g), []);
  const handleRating  = useCallback((r) => setRating(r), []);
  const handleRetry   = useCallback(() => setFetchKey((k) => k + 1), []);
  const handleCardClick = useCallback((movie) => setSelectedMovie(movie), []);
  const handleCloseModal = useCallback(() => setSelectedMovie(null), []);

  const clearQuery  = () => setQuery("");
  const clearGenre  = () => setGenre("All Genres");
  const clearRating = () => setRating("");

  const chips = [
    query && { label: `"${query}"`, clear: clearQuery },
    genre !== "All Genres" && { label: genre, clear: clearGenre },
    rating && { label: `${rating}+ Stars`, clear: clearRating },
  ].filter(Boolean);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">Stream<span>ify</span></div>
          <SearchBar query={query} onSearch={handleSearch} />
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <h1>Discover <span className="grad">Movies</span> You'll Love</h1>
          <p>
            {allMovies.length > 0
              ? `Browse ${allMovies.length} handpicked films — click any card for full details.`
              : "Your personal movie discovery platform."}
          </p>
        </section>

        {/* CONTROLS */}
        <div className="controls">
          <FilterBar genre={genre} rating={rating} onGenreChange={handleGenre} onRatingChange={handleRating} />
          {!loading && !error && (
            <span className="result-count">
              Showing <strong>{movies.length}</strong> of <strong>{allMovies.length}</strong> movies
            </span>
          )}
        </div>

        {/* ACTIVE CHIPS */}
        {chips.length > 0 && (
          <div className="chips-bar">
            {chips.map((c) => (
              <button key={c.label} className="chip" onClick={c.clear} title={`Remove: ${c.label}`}>
                {c.label} <span className="x">✕</span>
              </button>
            ))}
          </div>
        )}

        {/* MOVIE GRID */}
        <MovieList
          movies={movies}
          loading={loading}
          error={error}
          onRetry={handleRetry}
          onMovieClick={handleCardClick}
        />
      </main>

      {/* FOOTER */}
      <footer>
        <p>
          Built with ❤️ using <strong>React + Vite</strong> · Data from{" "}
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDB</a>{" "}
          · <strong>Streamify</strong> &copy; {new Date().getFullYear()}
        </p>
      </footer>

      {/* MOVIE DETAIL MODAL */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}
