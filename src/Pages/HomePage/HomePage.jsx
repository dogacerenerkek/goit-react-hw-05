import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../Services/api";
import MovieList from "../../Components/MovieList/MovieList";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Trending Movies</h1>
      {loading && <p className={css.message}>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;