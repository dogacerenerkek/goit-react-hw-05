import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../Services/api";
import MovieList from "../../Components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query) return;

    const getMovies = async () => {
      setLoading(true);
      try {
        const data = await searchMovies(query);
        setMovies(data);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.currentTarget.elements.search.value.trim();
    if (!value) return;
    setSearchParams({ query: value });
  };

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          name="search"
          defaultValue={query}
          placeholder="Search movies..."
          className={css.input}
        />
        <button type="submit" className={css.button}>Search</button>
      </form>

      {loading && <p className={css.message}>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;