import { GENRES, RATINGS } from "../data/movies";

export default function FilterBar({ genre, rating, onGenreChange, onRatingChange }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter movies">
      <select
        id="genre-filter"
        className="filter-select"
        value={genre}
        onChange={(e) => onGenreChange(e.target.value)}
        aria-label="Filter by genre"
      >
        {GENRES.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <select
        id="rating-filter"
        className="filter-select"
        value={rating}
        onChange={(e) => onRatingChange(e.target.value)}
        aria-label="Filter by rating"
      >
        {RATINGS.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>
    </div>
  );
}
