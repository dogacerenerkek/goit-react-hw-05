import { useEffect, useState } from "react";
import { useParams, useLocation, NavLink, Link, Outlet } from "react-router-dom";
import { fetchMovieDetails, IMG_URL } from "../../Services/api";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [backLink] = useState(location.state ?? "/movies");

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  return (
    <div>
      <Link to={backLink}>← Go back</Link>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {movie && (
        <div className={css.container}>
          <img
            src={`${IMG_URL}${movie.poster_path}`}
            alt={movie.title}
            className={css.img}
          />
          <div className={css.info}>
            <h1>{movie.title}</h1>
            <p>⭐ {movie.vote_average.toFixed(1)}</p>
            <h2>About</h2>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <p>{movie.genres.map(g => g.name).join(", ")}</p>
          </div>
        </div>
      )}

      <div className={css.links}>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;